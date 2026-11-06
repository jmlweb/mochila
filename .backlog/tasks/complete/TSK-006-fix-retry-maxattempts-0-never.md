---
id: TSK-006
title: Fix: retry maxAttempts <= 0 never calls fn and rejects with undefined
status: complete
priority: P3
tags: [retry, bug]
created: 2026-11-03
source: report/RPT-006
depends-on: []
started: 2026-11-06
completed: 2026-11-06
---

# Fix: retry maxAttempts <= 0 never calls fn and rejects with undefined

## Description

`src/retry/retry.ts:51` loops `attempt < maxAttempts` without validating it; with 0/negative/NaN, `fn` is never called and line 67 throws `undefined`. Validate config per the library convention (`lruCache` throws `'max must be a positive integer'`). See RPT-006 for the reproduction.

## Acceptance Criteria

- [x] Tests for maxAttempts 0, negative and NaN fail before the fix (rejection value is undefined) — evidence: 12 new tests failed pre-fix: retry(config) did not throw (2026-11-06) (2026-11-06)
- [x] Invalid maxAttempts produces an Error with a specific message such as maxAttempts must be a positive integer — evidence: maxAttempts below 1 or NaN throws Error maxAttempts must be at least 1 (2026-11-06) (2026-11-06)
- [x] Negative or NaN delay options are rejected with a specific Error message — evidence: initialDelayMs/backoffMultiplier/maxDelayMs NaN or negative throw named Errors (2026-11-06) (2026-11-06)
- [x] Existing retry tests pass unmodified; no exported signature changes; full verify gate green; commit is fix: — evidence: 11 original retry tests unmodified; 585 pass, lint 0 errors, tc 99.87%, build ok, size 3.14 kB, d.ts signature unchanged (2026-11-06) (2026-11-06)

## Notes

## Learnings

## Progress Log

- [2026-11-03] Created
- [2026-11-06] Started
- [2026-11-06] Completed