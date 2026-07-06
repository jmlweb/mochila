---
name: harden
description: Adversarial edge-case audit of one or more mochila-ts utilities — hunt the bug classes this library has actually shipped (division by zero, negative-number math, circular references, unicode, memory leaks in stateful utilities), prove each bug with a failing test, then fix. Use when the user says "harden", "audit", "find edge cases", "stress test {utility}", or after a batch of new utilities lands.
---

# Harden mochila-ts utilities

Systematic version of the hardening passes this repo does by hand. Git history
shows the recurring shipped-bug classes: `fix: add division by zero
validation`, `fix: implement true mathematical modulo for negative numbers`,
`fix: add circular reference protection to deepEqual`, `fix: debounce
potential memory leak`, `fix: subscription unsubscribe memory leak`,
`Fix: Handle consecutive underscores in snakeCase`. This skill hunts those
classes on purpose instead of waiting for them.

## Scope selection

- User named utilities → audit those.
- User said "recent" → `git log --oneline -15 -- src/` and audit utilities
  touched since the last release commit (`chore(release)`).
- User said "everything" or gave no scope → propose a batch of at most 10,
  prioritizing: stateful utilities (`debounce`, `throttle`, `memoize`,
  `lruCache`, `subscription`, `retry`, `delay`), then math (`divide`,
  `modulo`, `clamp`, `binarySearch`, `parsePosition`), then deep-traversal
  (`deepEqual`, `deepClone`, `deepMerge`, `path`), then string parsing
  (`camelCase`, `snakeCase`, `kebabCase`, `split`, `columnify`). These
  categories produced every shipped bug so far.

## Per-utility procedure

### 1. Read and model

Read `{name}.ts` and `{name}.test.ts` fully. Write down (for the final
report): the input domain, the claimed contract per JSDoc, and which edge
regions the existing tests already cover.

### 2. Attack checklist

Go through every applicable class; for each, decide "covered by existing
test", "safe by construction", or "suspicious — write attack test":

**Numbers**

- 0 and -0, negative operands (esp. modulo/rounding), `NaN`, `±Infinity`
- non-integers where integers are implied; `Number.MAX_SAFE_INTEGER` overflow
- division by zero → must throw or be documented, never silently `Infinity`

**Arrays**

- empty, single element, all-duplicates
- `as const` readonly tuples through the generic chain
- sparse arrays (`[1, , 3]`), very large arrays only if algorithmic
  complexity looks worse than O(n log n)
- index out of range / negative index for positional utilities

**Strings**

- empty string, whitespace-only
- unicode: accents (`'Joaquín'`), emoji/surrogate pairs, combining marks
- consecutive delimiters (`foo__bar`), leading/trailing delimiters
- case-conversion round-trips: `camelCase(kebabCase(x))` stability

**Objects**

- empty object, `Object.create(null)` (no prototype)
- inherited vs own properties; symbol keys if keys are enumerated
- circular references for anything that recurses (`deepEqual`, `deepClone`,
  `deepMerge`) — must terminate, not stack-overflow
- keys named `__proto__` / `constructor` for anything that writes into an
  object by dynamic key (prototype pollution)

**Functions / stateful factories**

- double-invoke: `unsubscribe()` twice, `cancel()` after fire, `set` after TTL
- leak check: does every registered callback/timer have a release path?
  (`clearTimeout` on cancel, map entry deleted on unsubscribe)
- reentrancy: callback that calls back into the utility
- `this`-independence: utility methods destructured off the returned object

**Async**

- rejection propagation (does `retry` rethrow the LAST error?)
- concurrent invocations sharing state
- timer utilities with `jest.useFakeTimers()` — zero delay, rapid-fire calls

**Types (compile-time attacks)**

- does the result widen to `unknown[]`/`any` with a generic callback?
- does a type-guard predicate narrow the output (`filter(isString)` →
  `string[]`)?
- does `as const` input survive without error?

### 3. Prove, then fix

For each suspicion, write the attack test FIRST and run it:

```bash
pnpm test -- --testPathPattern src/{name}
```

- **Test passes** → behavior is fine; keep the test anyway (it documents the
  edge) if it adds coverage, drop it if redundant.
- **Test fails** → confirmed bug. Fix the implementation minimally, keeping
  the public signature identical. If the correct fix REQUIRES changing an
  exported signature or documented behavior, stop and ask the user — that is
  a breaking change, not a `fix:`.

Never weaken an existing test to make an attack pass. Update JSDoc when the
fix pins down previously-unspecified behavior (e.g. "throws on division by
zero").

### 4. Verify

After all fixes: full gate.

```bash
pnpm test:coverage && pnpm lint && pnpm type-check && pnpm build && pnpm size
```

## Report format

One section per audited utility:

- **{name}** — verdict: `clean` / `hardened` / `needs decision`
  - Bugs found (each with the one-line failing input → wrong output)
  - Attack tests added (count + which classes)
  - Anything escalated (signature-change fixes awaiting user decision)

Suggest one commit per utility with real bugs (`fix: {what was wrong in
{name}}` — patch release each) and a single `test: add edge case tests for
{names}` commit for the clean-but-now-better-covered ones. Commit only if
asked.
