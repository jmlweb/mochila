---
id: TSK-004
title: Fix: debounce sync throw in fn escapes as uncaught exception and pending promises never settle
status: complete
priority: P2
tags: [debounce, bug]
created: 2026-11-03
source: report/RPT-004
depends-on: []
started: 2026-11-06
completed: 2026-11-06
---

# Fix: debounce sync throw in fn escapes as uncaught exception and pending promises never settle

## Description

`src/debounce/debounce.ts:35` evaluates `fn(...args)` before `Promise.resolve` wraps it, so a synchronous throw escapes the timer callback and leaves all pending promises unsettled. Route the call through the promise chain (e.g. `Promise.resolve().then(() => fn(...args))`). See RPT-004 for the reproduction.

## Acceptance Criteria

- [x] A test with a synchronously throwing fn fails before the fix: the debounced promise never settles — evidence: 3 new tests failed pre-fix (advanceTimersByTime threw boom / first call fails) (2026-11-06) (2026-11-06)
- [x] After the fix, every pending promise rejects with the thrown error and no uncaught exception is raised — evidence: fix: sync throw routes to reject; tests assert all pending reject, no throw from timer (2026-11-06) (2026-11-06)
- [x] Existing debounce tests pass unmodified; no exported signature changes — evidence: 4 existing debounce tests unmodified, pass; no signature change (2026-11-06) (2026-11-06)
- [x] Full verify gate green; commit is fix: — evidence: test:coverage 570 pass, lint 0 errors, type-check 99.87%, build ok, size 3.09 kB (2026-11-06) (2026-11-06)

## Notes

## Learnings

## Progress Log

- [2026-11-03] Created
- [2026-11-06] Started
- [2026-11-06] Completed