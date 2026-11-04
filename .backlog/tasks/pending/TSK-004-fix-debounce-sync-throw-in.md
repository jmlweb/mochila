---
id: TSK-004
title: Fix: debounce sync throw in fn escapes as uncaught exception and pending promises never settle
status: pending
priority: P2
tags: [debounce, bug]
created: 2026-11-03
source: report/RPT-004
depends-on: []
---

# Fix: debounce sync throw in fn escapes as uncaught exception and pending promises never settle

## Description

`src/debounce/debounce.ts:35` evaluates `fn(...args)` before `Promise.resolve` wraps it, so a synchronous throw escapes the timer callback and leaves all pending promises unsettled. Route the call through the promise chain (e.g. `Promise.resolve().then(() => fn(...args))`). See RPT-004 for the reproduction.

## Acceptance Criteria

- [ ] A test with a synchronously throwing fn fails before the fix: the debounced promise never settles
- [ ] After the fix, every pending promise rejects with the thrown error and no uncaught exception is raised
- [ ] Existing debounce tests pass unmodified; no exported signature changes
- [ ] Full verify gate green; commit is fix:

## Notes

## Learnings

## Progress Log

- [2026-11-03] Created