---
id: TSK-002
title: Fix: memoize cache key collides for undefined/null/NaN/Infinity arguments
status: pending
priority: P3
tags: []
created: 2026-10-31
source: report/RPT-002
depends-on: []
---

# Fix: memoize cache key collides for undefined/null/NaN/Infinity arguments

## Description

Source: RPT-002. `memoize` keys by `JSON.stringify(args)` (`src/memoize/memoize.ts:26`), which maps `undefined`, `null`, `NaN` and `±Infinity` to `null`, so `f(null)` and `f(undefined)` share a cache entry.

## Acceptance Criteria

- [ ] A test calls one memoized instance with null then undefined, and NaN then null, and gets distinct results; it fails before the fix
- [ ] Cache key in src/memoize/memoize.ts distinguishes undefined, null, NaN, Infinity and -Infinity
- [ ] Existing memoize tests pass unmodified
- [ ] JSDoc states how arguments are keyed
- [ ] Commit is fix: and no exported signature changes

## Notes

## Learnings

## Progress Log

- [2026-10-31] Created