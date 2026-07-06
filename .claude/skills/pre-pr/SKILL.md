---
name: pre-pr
description: Release-safety gate for mochila-ts before opening or updating a PR — run the full verify pipeline, classify the diff's real semver impact against the proposed commit/PR title, check the export chain and README table for drift, and produce a ready-to-use PR title and body. Use when the user says "pre-pr", "ready to ship?", "open a PR", "check before merge", or after finishing any branch work.
---

# Pre-PR gate for mochila-ts

Merging to `main` publishes to npm: semantic-release parses the squash-merge
commit (= the PR title) and ships a version. This skill's job is to make the
gate green AND make the declared semver impact match the actual diff, because
a mislabeled PR title publishes a wrong version to the public registry.

## Step 1 — Establish the diff

```bash
git status
git log --oneline main..HEAD
git diff main...HEAD --stat
```

If on `main` with uncommitted work, warn the user and diff the working tree
instead. Confirm nothing staged from `dist/`, `coverage/`, or `docs/`.

## Step 2 — Full verify gate

```bash
pnpm test:coverage && pnpm lint && pnpm type-check && pnpm build && pnpm size
```

All five must pass. On failure: fix what your branch broke; never loosen a
threshold, delete a test, or add an `eslint-disable` to get green — those are
user decisions. For coverage, check the per-file rows of files this branch
touched (global 85% can hide an under-tested new file; touched files should
be near 100%).

## Step 3 — Semver classification (the core step)

Read the actual API surface change, not the intent:

```bash
git diff main...HEAD -- 'src/**/*.ts' ':!src/**/*.test.ts'
```

Classify honestly:

| Diff contains                                                                                                                                                                | Real impact | Required label                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------- |
| Only test/docs/tooling changes                                                                                                                                               | none        | `test:` / `docs:` / `chore:` / `ci:` (no release)                            |
| New exported utility or new optional parameter                                                                                                                               | minor       | `feat:`                                                                      |
| Behavior corrected, all exported signatures identical                                                                                                                        | patch       | `fix:` (or `perf:` with a measurement)                                       |
| Any exported name removed/renamed, parameter added/required/reordered, return type narrowed/widened, documented behavior changed incompatibly, thrown-error contract changed | **major**   | `BREAKING CHANGE:` footer — STOP and confirm with the user before proceeding |

Cross-checks that catch mislabels:

- `git diff main...HEAD src/index.ts` — any removed `export` line = breaking.
- Changed `.ts` files where the exported `const`/`function` line itself
  changed → inspect the signature character by character.
- An existing test's assertions were modified (not just added) → either the
  old assertion was wrong (must be explained in the PR body) or the change is
  breaking. Flag it explicitly.
- Compare against the branch's commit messages: if commits say `fix:` but the
  diff adds an export, the squash title must still be `feat:` — the PR title
  is what semantic-release reads, individual commits vanish in the squash.

## Step 4 — Drift checks

Fast repo-consistency sweeps:

1. **Export chain**: every `src/{name}/` directory is exported from
   `src/index.ts`, alphabetically:
   ```bash
   ls src | grep -v -e index.ts -e types > /tmp/dirs.txt
   grep -o "from './[a-zA-Z]*'" src/index.ts | sed "s/from '\.\///;s/'//" | sort > /tmp/exports.txt
   diff /tmp/dirs.txt /tmp/exports.txt
   ```
2. **README table map**: every new utility on this branch appears in
   `CATEGORIES` in `scripts/generate-utilities-table.js`.
3. **Ruler sync**: if the branch touched `CLAUDE.md` or `.cursor/rules/`
   without touching `.ruler/`, warn — Ruler regeneration will clobber it.
   If it touched `.ruler/` without regenerated outputs, run
   `ruler apply --agents cursor,claude` (if installed) or tell the user to.
4. **JSDoc presence** on every new export (`@category`, `@example`, `@param`,
   `@returns`, `@typeParam`).

## Step 5 — Produce the PR

Title: valid conventional commit matching the Step 3 classification, ≤72
chars, imperative (`feat: add binarySearch utility`, not
`feat: added binary search`).

Body template:

```markdown
## What

{1–3 sentences: what changed and why}

## Semver impact

{patch|minor|major|none} — {one-line justification tied to the diff}

## Verification

- [x] pnpm test:coverage (touched files ≥{n}%)
- [x] pnpm lint
- [x] pnpm type-check ({n}%)
- [x] pnpm build
- [x] pnpm size ({n} kB)

{If any existing test assertion changed: explicit section explaining why the
old assertion was wrong.}
```

Present title + body + the semver verdict to the user. Open the PR with
`gh pr create` only if the user asked for that; never push or merge without
explicit permission.

## Output

End with a one-screen summary: gate results (5 checks), semver verdict with
justification, drift findings (or "none"), and the proposed PR title. If
anything required a user decision (breaking change, threshold failure,
modified assertions), lead with that instead.
