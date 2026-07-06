---
name: add-utility
description: Add a new utility to mochila-ts end-to-end — scaffold, implement data-last curried function, tests with type-level assertions, wire both export barrels, update the README table script, and run the full verify gate. Use when the user says "add utility", "new function", "implement {name}", or lists several utilities to add.
---

# Add a utility to mochila-ts

Complete pipeline for one or more new utilities. Follow every step in order;
the failure modes this skill prevents are exports left half-wired, the README
table script drifting, and type inference regressions that runtime tests
cannot catch.

If the user listed multiple utilities, run steps 1–6 per utility, then step 7
once at the end.

## Step 0 — Preconditions

1. If on `main`, create a branch first: `git checkout -b feat/add-{name}`.
2. Confirm the utility doesn't already exist: `ls src/ | grep -i {name}` and
   search for similar names (`grep -ril "{concept}" src/*/`). If something
   close exists, stop and tell the user instead of duplicating.
3. Decide the kind:
   - **Type guard** (`isFoo`) → flat file in `src/is/` (NOT its own directory).
   - **Everything else** → own directory `src/{name}/`.

## Step 1 — Read neighbors (mandatory, never skip)

Pick the two existing utilities closest in shape to what you're building and
read implementation + test + index for each. Selection guide:

| Building                       | Read                                                   |
| ------------------------------ | ------------------------------------------------------ |
| Array transform with predicate | `src/filter/`, `src/reject/`                           |
| Array transform with mapper    | `src/map/`, `src/groupBy/`                             |
| String transform               | `src/camelCase/`, `src/capitalize/`                    |
| Number/math                    | `src/clamp/`, `src/modulo/`                            |
| Object utility                 | `src/pick/`, `src/mapObject/`                          |
| Function/composition           | `src/flow/`, `src/complement/`                         |
| Stateful factory               | `src/lruCache/`, `src/subscription/`                   |
| Async                          | `src/retry/`, `src/asyncMap/`                          |
| Type guard                     | `src/is/isPlainObject.ts`, `src/is/isNonEmptyArray.ts` |

Imitate their exact conventions: readonly inputs, generic constraints,
overload style, shared type usage from `src/types/`, inline `type` imports.
Do NOT implement from documentation examples — they have drifted before.

## Step 2 — Scaffold

```bash
mkdir -p src/{name}
touch src/{name}/{name}.ts src/{name}/{name}.test.ts src/{name}/index.ts
```

For type guards instead: `touch src/is/{isName}.ts src/is/{isName}.test.ts`.

## Step 3 — Implement

Hard requirements:

- **Data-last curried**: `export const {name} = (config) => (data) => …`.
  Single-argument utilities (e.g. pure transforms like `capitalize`) take the
  data directly — check how neighbors of the same kind do it.
- Generics: constrain with `extends`; data parameter uses `<T extends V>` (or
  `<S extends readonly From[]>`) so element types narrow through the call.
- Inputs typed `readonly T[]` / `ReadonlyArray<T>`; never mutate inputs.
- If the predicate parameter can be a type guard, define an overloaded
  function type like `Filter` in `src/filter/filter.ts` so guard usage narrows
  the return type.
- Reuse shared types from `src/types/` (`AnyFn`, `Stringifiable`, `ToString`,
  `ProtectIfNonEmptyArray`, …) before inventing new ones. New broadly-useful
  types go in `src/types/` with their own export.
- Cross-utility imports go module-to-module (`import { toString } from
'../toString';`) — never from `../index`.
- No `any`. If you cannot type it without `any` or `@ts-expect-error`, stop
  and ask the user — that is an escalation rule, not a judgment call.
- Invalid config throws `Error` with a specific message
  (`'max must be a positive integer'` style).

JSDoc — all tags, written AFTER the implementation is final:

````typescript
/**
 * One-sentence description.
 *
 * @category Array
 *
 * @example
 * ```
 * const takeBig = {name}((x: number) => x > 2);
 * takeBig([1, 2, 3, 4]); // [3, 4]
 * ```
 *
 * @param config - What the config/predicate does
 * @param source - The data
 * @returns What comes back
 * @typeParam V - each generic gets a line
 */
````

`@category` must be one of the existing set: Array, String, Object, Function,
Number, Guard, Assertion, Type Helper, Boolean, Promise, Cache, Subscription,
Logic, Date. Trace the `@example` mentally against the real signature — it
must be copy-paste-runnable, including partial application.

## Step 4 — Tests

Minimum test set (expand as behavior warrants):

```typescript
import { {name} } from './{name}';

describe('{name}', () => {
  test('basic case', () => { /* happy path */ });

  test('empty input', () => { /* [] / '' / {} */ });

  // At least one of these edge groups, chosen by input domain:
  // arrays:  single element, duplicated elements, readonly/as-const source
  // numbers: 0, negative, NaN, Infinity, non-integer
  // strings: empty, unicode/accents, consecutive delimiters
  // objects: missing keys, prototype-less, nested/circular if traversed
  // async:   rejection path, concurrent calls
  // stateful: cleanup/unsubscribe (no leaks), double-call safety
  test('edge: …', () => { /* … */ });

  test('maintains type inference', () => {
    // Type-level assertion — compilation IS the assertion:
    const result: number[] = {name}(cfg)([1, 2, 3]);
    expect(result).toBeDefined();
  });
});
```

The type-inference test is mandatory: runtime coverage cannot detect a result
widening to `unknown[]`.

## Step 5 — Wire exports (three places)

1. `src/{name}/index.ts`:
   ```typescript
   export * from './{name}';
   ```
   (Type guards: add a named export line to `src/is/index.ts` instead, keeping
   the list alphabetical.)
2. `src/index.ts`: insert `export * from './{name}';` in strict alphabetical
   position — do not append at the bottom.
3. `scripts/generate-utilities-table.js`: add `'{name}'` to the correct array
   in the `CATEGORIES` map. This is the step everyone forgets; the README
   drifts silently without it.

## Step 6 — Per-utility verify

```bash
pnpm test:coverage
```

Read the coverage row for the new file specifically — the 85% threshold is
global and will not flag an under-tested new file. Target ~100% lines on your
own code and every branch you wrote.

## Step 7 — Full gate (once, after all utilities)

```bash
pnpm exec eslint --fix src/   # sorts imports, formats
pnpm test:coverage && pnpm lint && pnpm type-check && pnpm build && pnpm size
```

All five must pass. `pnpm type-check` must stay ≥95%; `pnpm size` must stay
under the 30 kB budget (current output ~3 kB — any jump is a bug).

Then report to the user, per utility: signature, category, edge cases covered,
and per-file coverage. Suggest commit message `feat: add {name} utility` (or
`feat: add {n} utilities: {a}, {b}, …` for a batch). Commit only if asked.
