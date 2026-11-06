---
id: TSK-005
title: Fix: Subscription subscriber that unsubscribes during notify causes the next subscriber to be skipped
status: complete
priority: P3
tags: [subscription, bug]
created: 2026-11-03
source: report/RPT-005
depends-on: []
started: 2026-11-06
completed: 2026-11-06
---

# Fix: Subscription subscriber that unsubscribes during notify causes the next subscriber to be skipped

## Description

`src/subscription/subscription.ts:33` iterates the live `subscribers` array with `forEach` while `unsubscribe` splices it, so self-unsubscribing subscribers make the next one miss the notification. `initialSubscribers` is also stored by reference. See RPT-005 for the reproduction.

## Acceptance Criteria

- [x] A test where a subscriber unsubscribes itself during notify fails before the fix: the following subscriber is skipped — evidence: 5 new tests failed pre-fix, skipped subscriber got 0 calls (2026-11-06) (2026-11-06)
- [x] notify iterates a snapshot so every subscriber registered at notify time is called exactly once — evidence: notify iterates [...subscribers]; test: each of 3 self-unsubscribers called once (2026-11-06) (2026-11-06)
- [x] Subscription copies initialSubscribers so the caller array is not mutated, with a test — evidence: initialSubscribers copied; tests: passed array unmutated, later changes ignored (2026-11-06) (2026-11-06)
- [x] Existing subscription tests pass unmodified; full verify gate green; commit is fix: — evidence: 7 original tests unmodified; 574 pass, lint 0 errors, tc 99.87%, build ok, size 3.09 kB (2026-11-06) (2026-11-06)

## Notes

## Learnings

## Progress Log

- [2026-11-03] Created
- [2026-11-06] Started
- [2026-11-06] Completed