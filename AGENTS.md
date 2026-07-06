# mochila-ts — Operating Manual

97 composable TypeScript utilities, published to npm as `mochila-ts`. Data-last
curried pattern, zero runtime dependencies, semantic-release. This file is the
contract: follow it exactly, and when it conflicts with the actual code, the
code wins — then flag the drift.

## Non-negotiable invariants

1. **Zero runtime dependencies.** `package.json` has only `devDependencies`.
   Never add a runtime dependency. Ask before adding even a dev dependency.
2. **Data-last currying.** Config/predicate first, data last:
   `myFn(config)(data)`. Never `myFn(data, config)`.
3. **Commits drive releases.** Every commit message on `main` is parsed by
   semantic-release: `feat:` → minor, `fix:` → patch, `BREAKING CHANGE:` →
   major, published to npm automatically. A mislabeled commit ships a wrong
   version to the public registry.
4. **No explicit `any`** except `AnyFn` in `src/types/function.ts` (documented
   exception for composition primitives like `pipe`).
5. **PR flow.** Work on a branch, never commit directly to `main`. PRs are
   squash-merged, so the PR title must itself be a valid conventional commit —
   it becomes the commit that semantic-release reads.

## Ground rule: read neighbors before writing

Documentation examples in this repo have drifted before. The authoritative
pattern is the existing source. **Before implementing or modifying any
utility, read two similar existing utilities in full** (implementation + test

- index) and imitate them. Good reference points:

* `src/filter/filter.ts` — overloaded type with a type-guard overload
* `src/groupBy/groupBy.ts` — cross-utility imports, advanced type helpers
* `src/pipe/pipe.ts` — arity via explicit overload list
* `src/lruCache/lruCache.ts` — options object, input validation, factory shape

## Repository map

```
src/
├── {utilityName}/
│   ├── {utilityName}.ts       # implementation
│   ├── {utilityName}.test.ts  # tests
│   └── index.ts               # export * from './{utilityName}'
├── is/                        # EXCEPTION: flat layout — isArray.ts,
│   │                          # isArray.test.ts, … all directly in src/is/
│   └── index.ts               # named exports, one line per guard
├── types/                     # shared types (array/, function.ts, extends.ts,
│                              # helpers.ts, string.ts, number.ts, object.ts, boolean.ts)
└── index.ts                   # export * from './…' — strictly alphabetical
```

Other load-bearing files:

| File                                  | Purpose                                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `scripts/generate-utilities-table.js` | README table generator with a **hardcoded `CATEGORIES` map** — new utilities must be added there                    |
| `AGENTS.md`                            | This manual — single source of AI instructions. `CLAUDE.md` is a symlink to it                                      |
| `eslint.config.mjs`                   | ESLint 9 flat config extending `@jmlweb/eslint-config-base`. There is no `.eslintrc.*`                              |
| `package.json#prettier`               | Prettier config = `@jmlweb/prettier-config-base`. There is no `.prettierrc.json`                                    |
| `tsconfig.json`                       | Extends `@jmlweb/tsconfig-base`; `verbatimModuleSyntax: false` is deliberate (CJS build breaks otherwise)           |
| `tsup.config.ts`                      | ESM + CJS + d.ts, target es2020                                                                                     |
| `jest.config.js`                      | Coverage thresholds: 85% lines/functions/statements, 50% branches (global)                                          |
| `.github/workflows/release.yml`       | Push to main → test → semantic-release → npm publish → docs to GitHub Pages                                         |

## Conventions

### Function shape

```typescript
export const myFn =
  <From, To extends Constraint>(config: (item: From) => To) =>
  <S extends readonly From[]>(source: S) => {
    // implementation
  };
```

- Accept `readonly T[]` / `ReadonlyArray<T>`, return mutable results.
- Use `<T extends V>` on the data parameter so element types narrow.
- When a predicate can be a type guard, provide an overloaded type (see
  `Filter` in `src/filter/filter.ts`) so `filter(isString)` narrows the result.
- Import shared types with inline `type` specifier:
  `import { type AnyFn } from '../types';`
- Utilities may reuse sibling utilities — import the module directly
  (`import { toString } from '../toString';`), **never** from `../index` or
  `src/index` (circular imports).
- Named exports only. No default exports. No classes unless the utility is a
  stateful factory (e.g. `LRUCache`), and even then export a factory function.
- Validate impossible inputs by throwing `Error` with a specific message
  (`'max must be a positive integer'`), not by returning silently.

### JSDoc (required on every export)

Tags, all of them: `@category`, `@example`, `@param`, `@returns`, `@typeParam`
(when generics exist). Categories in use — reuse one, don't invent:
`Array`, `String`, `Object`, `Function`, `Number`, `Guard`, `Assertion`,
`Type Helper`, `Boolean`, `Promise`, `Cache`, `Subscription`, `Logic`, `Date`.

The `@example` block must be copy-paste-runnable against the real signature —
write it last, after the implementation is final, and trace it mentally.

### Imports and formatting

- `simple-import-sort` enforces order; run `pnpm exec eslint --fix src/` rather
  than sorting by hand.
- Prettier runs on staged files via husky/lint-staged — don't hand-format.

### Commits

Conventional commits, enforced by commitlint. Types: `feat` `fix` `docs`
`style` `refactor` `perf` `test` `chore` `ci`. Never commit `dist/`,
`coverage/`, or `docs/` output.

## Named failure modes and the rule that prevents each

| #   | Failure mode                                                                                                                                                                                                     | Prevention rule                                                                                                                                                                                                                 |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Copying stale doc examples.** Old docs showed `filter` with an `as T[]` cast; the real code uses an overloaded type.                                                                                           | Never implement from a doc example. Read the actual source of two neighbor utilities first.                                                                                                                                     |
| 2   | **Forgetting the README table map.** New utility works, but `scripts/generate-utilities-table.js` `CATEGORIES` doesn't list it, so the README drifts.                                                            | Adding a utility = editing that script in the same PR. It's a checklist item below.                                                                                                                                             |
| 3   | **Replacing the `CLAUDE.md` symlink with a regular file.** `CLAUDE.md` is a symlink to `AGENTS.md`; writing a separate file forks the instructions.                                                                                           | To change AI instructions, edit `AGENTS.md` only. Verify the link stays intact: `test -L CLAUDE.md`.                                                                                            |
| 4   | **Importing from the barrel.** `import { map } from '../index'` compiles but creates a circular import that breaks tree-shaking and can break the build.                                                         | Cross-utility imports go module-to-module: `../map`.                                                                                                                                                                            |
| 5   | **Data-first signature.** `myFn(data, config)` passes tests but breaks `pipe` composition and the library's entire contract.                                                                                     | Signature review before writing tests: does `myFn(config)` return a function that takes only data?                                                                                                                              |
| 6   | **Wrong semver via commit type.** Labeling an API change `fix:` publishes a patch that breaks consumers.                                                                                                         | If any exported signature, name, or observable behavior changes incompatibly: `BREAKING CHANGE:` footer, and escalate first (see below). Renames and removals are always breaking.                                              |
| 7   | **Tests pass, types regressed.** Runtime tests can't catch inference breaking (e.g. result widening to `unknown[]`).                                                                                             | Every new/changed utility gets a type-level assertion in its test (`const r: number[] = myFn(cfg)([1, 2]);`) and `pnpm type-check` must stay ≥95%.                                                                              |
| 8   | **"Fixing" deliberate config.** `verbatimModuleSyntax: false`, the relaxed `no-unsafe-*` ESLint rules, and `AnyFn` all look like mistakes. They are not.                                                         | Don't touch `tsconfig.json`, `eslint.config.mjs` rule relaxations, or `src/types/function.ts` unless the task is explicitly about them.                                                                                         |
| 9   | **Export chain half-done.** Utility exists but isn't in its own `index.ts`, or is appended to the bottom of `src/index.ts`.                                                                                      | Two exports per utility: `src/{name}/index.ts` and `src/index.ts` in strict alphabetical position. Verify with the checklist.                                                                                                   |
| 10  | **Treating `src/is/` like the other modules.** Creating `src/is/isFoo/isFoo.ts` breaks the established flat layout.                                                                                              | New type guards go directly in `src/is/` as `isFoo.ts` + `isFoo.test.ts`, with a named export line added to `src/is/index.ts`.                                                                                                  |
| 11  | **Global coverage masking gaps.** The 85% threshold is global — a new utility can be badly under-tested while the suite still passes.                                                                            | Judge coverage per-file: `pnpm test:coverage` and read the row for your utility. New code targets ~100% lines, all branches you wrote.                                                                                          |
| 12  | **Silent bundle growth.** Nothing in `pnpm test`/`lint` checks size.                                                                                                                                             | Run `pnpm size` after adding code. Limit is 30 kB; current output is ~3 kB, so any large jump is a bug (accidental import, polyfill, dependency).                                                                               |
| 13  | **Guessing edge-case behavior.** Utilities here have shipped bugs on division by zero, negative-number modulo, circular references, consecutive underscores in snakeCase, memory leaks in debounce/subscription. | Every implementation must state (in tests) its behavior for: empty input, single element, `null`/`undefined` where the type allows, boundary numbers (0, negative, NaN, Infinity) if numeric, and non-ASCII if string-handling. |

## Quality bar — checkable, per deliverable

### New utility — done when ALL of these are true

- [ ] Files exist: `src/{name}/{name}.ts`, `{name}.test.ts`, `index.ts`
      (or flat in `src/is/` for guards)
- [ ] Signature is data-last curried; partial application shown in `@example`
- [ ] JSDoc has `@category` (from the list above), `@example`, `@param`,
      `@returns`, `@typeParam` for each generic
- [ ] Input is `readonly`; generics use `extends` constraints; no `any`
- [ ] Tests include: basic case, empty input, at least one edge case from
      failure mode #13, and a type-level assertion
- [ ] Exported from `src/{name}/index.ts` AND `src/index.ts` (alphabetical)
- [ ] Added to `CATEGORIES` in `scripts/generate-utilities-table.js`
- [ ] `pnpm test:coverage` passes and the new file's own row is ≥95% lines
- [ ] `pnpm lint` → 0 errors; `pnpm type-check` → ≥95%; `pnpm build` succeeds;
      `pnpm size` under limit
- [ ] Commit/PR title: `feat: add {name} utility`

### Bug fix — done when

- [ ] A test reproducing the bug exists and **failed before the fix**
      (run it against the unfixed code, or stash the fix, to prove it)
- [ ] The fix changes no exported signatures (else it's not a `fix:`)
- [ ] All prior tests still pass unmodified — if an existing test had to
      change, the old assertion was either wrong (say so in the PR) or this is
      a breaking change (escalate)
- [ ] JSDoc updated if documented behavior changed
- [ ] Commit: `fix: {what was wrong}` — not `fix: update {file}`

### Refactor — done when

- [ ] Zero changes to exported names, signatures, or runtime behavior
- [ ] No test assertions modified (test-file moves/renames OK)
- [ ] Full gate green: `pnpm test:coverage && pnpm lint && pnpm type-check &&
    pnpm build && pnpm size`
- [ ] Commit: `refactor:` (or `perf:` if measured faster — include the
      measurement in the PR)

### Docs change — done when

- [ ] Every code example was checked against the current source signature it
      documents (open the file; don't trust the old doc)
- [ ] AI-instruction changes edit `AGENTS.md`; `CLAUDE.md` remains a symlink
      (`test -L CLAUDE.md`)
- [ ] Commit: `docs:`

### Any PR — done when

- [ ] Title is a valid conventional commit that matches the real semver impact
- [ ] Branch is not `main`; no `dist/`, `coverage/`, `docs/` output staged
- [ ] Full verify gate green locally before pushing

## Escalation rules — exact

**Stop and ask the user before:**

1. Adding any dependency, runtime or dev.
2. Changing, renaming, or removing any exported API — anything that would
   require `BREAKING CHANGE:`.
3. Editing `.github/workflows/*`, `release.config.cjs`, `package.json`
   `exports`/`engines`/`files`, or publish-related config.
4. Writing `any` (outside `AnyFn`), `@ts-expect-error`, `@ts-ignore`, or an
   `eslint-disable` comment — if the types don't work without these, the
   design is wrong or the decision is the user's.
5. Loosening any threshold (coverage, type-coverage, size-limit) or skipping
   a failing check to get green.
6. Deleting a utility or test, or modifying an existing test's assertions to
   make your change pass.
7. Pushing, merging, or anything that touches `main` directly.

**Proceed without asking when:**

- The task is additive and every decision can be resolved by imitating an
  existing utility. Pick the nearest neighbor and copy its conventions.
- A doc contradicts the code: follow the code, note the drift in your summary.
- Tests fail because of your change: fix your change, don't ask.

**When two conventions conflict** (e.g. doc example vs. real source): code >
config files > DEVELOPMENT.md > this file's examples. Report the conflict
either way.

## Command reference

```bash
pnpm install                 # setup
pnpm test                    # jest
pnpm test:watch              # watch mode
pnpm test:coverage           # coverage, thresholds 85/85/85/50
pnpm lint                    # eslint (flat config, includes prettier check)
pnpm exec eslint --fix src/  # auto-fix imports/format
pnpm type-check              # type-coverage, must stay ≥95%
pnpm build                   # tsup → dist/ (ESM + CJS + d.ts)
pnpm size                    # size-limit, 30 kB budget
pnpm doc                     # typedoc → docs/
node scripts/generate-utilities-table.js  # regenerate README table
```

Full verify gate (run before every commit):

```bash
pnpm test:coverage && pnpm lint && pnpm type-check && pnpm build && pnpm size
```

See [DEVELOPMENT.md](./DEVELOPMENT.md) for architecture background and
[ROADMAP.md](./ROADMAP.md) for planned modernization (Vitest evaluation,
ES2022 target).
