---
id: TSK-006
title: Fix: retry maxAttempts <= 0 never calls fn and rejects with undefined
status: pending
priority: P3
tags: [retry, bug]
created: 2026-11-03
source: report/RPT-006
depends-on: []
---

# Fix: retry maxAttempts <= 0 never calls fn and rejects with undefined

## Description

`src/retry/retry.ts:51` loops `attempt < maxAttempts` without validating it; with 0/negative/NaN, `fn` is never called and line 67 throws `undefined`. Validate config per the library convention (`lruCache` throws `'max must be a positive integer'`). See RPT-006 for the reproduction.

## Acceptance Criteria

- [ ] Tests for maxAttempts 0, negative and NaN fail before the fix (rejection value is undefined)
- [ ] Invalid maxAttempts produces an Error with a specific message such as maxAttempts must be a positive integer
- [ ] Negative or NaN delay options are rejected with a specific Error message
- [ ] Existing retry tests pass unmodified; no exported signature changes; full verify gate green; commit is fix:

## Notes

## Learnings

## Progress Log

- [2026-11-03] Created