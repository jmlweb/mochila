---
id: TSK-002
title: Fix: memoize cache key collides for undefined/null/NaN/Infinity arguments
status: complete
priority: P3
tags: []
created: 2026-10-31
source: report/RPT-002
depends-on: []
started: 2026-11-06
completed: 2026-11-06
---

# Fix: memoize cache key collides for undefined/null/NaN/Infinity arguments

## Description

Source: RPT-002. `memoize` keys by `JSON.stringify(args)` (`src/memoize/memoize.ts:26`), which maps `undefined`, `null`, `NaN` and `±Infinity` to `null`, so `f(null)` and `f(undefined)` share a cache entry.

## Acceptance Criteria

- [x] A test calls one memoized instance with null then undefined, and NaN then null, and gets distinct results; it fails before the fix — evidence: 7 new tests failed pre-fix, e.g. expected 5 calls received 1 (2026-11-06) (2026-11-06)
- [x] Cache key in src/memoize/memoize.ts distinguishes undefined, null, NaN, Infinity and -Infinity — evidence: replacer tags undefined, NaN, ±Infinity; 577 tests pass (2026-11-06) (2026-11-06)
- [x] Existing memoize tests pass unmodified — evidence: 12 original memoize tests unmodified and passing (2026-11-06) (2026-11-06)
- [x] JSDoc states how arguments are keyed — evidence: memoize.ts JSDoc key semantics paragraph (2026-11-06) (2026-11-06)
- [x] Commit is fix: and no exported signature changes — evidence: signature unchanged; commit fix(memoize) (2026-11-06) (2026-11-06)

## Notes

## Learnings

## Progress Log

- [2026-10-31] Created
- [2026-11-06] Started
- [2026-11-06] Completed