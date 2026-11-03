---
id: TSK-005
title: Fix: Subscription subscriber that unsubscribes during notify causes the next subscriber to be skipped
status: pending
priority: P3
tags: [subscription, bug]
created: 2026-11-03
source: report/RPT-005
depends-on: []
---

# Fix: Subscription subscriber that unsubscribes during notify causes the next subscriber to be skipped

## Description

`src/subscription/subscription.ts:33` iterates the live `subscribers` array with `forEach` while `unsubscribe` splices it, so self-unsubscribing subscribers make the next one miss the notification. `initialSubscribers` is also stored by reference. See RPT-005 for the reproduction.

## Acceptance Criteria

- [ ] A test where a subscriber unsubscribes itself during notify fails before the fix: the following subscriber is skipped
- [ ] notify iterates a snapshot so every subscriber registered at notify time is called exactly once
- [ ] Subscription copies initialSubscribers so the caller array is not mutated, with a test
- [ ] Existing subscription tests pass unmodified; full verify gate green; commit is fix:

## Notes

## Learnings

## Progress Log

- [2026-11-03] Created