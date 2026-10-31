---
id: TSK-001
title: Fix: LRUCache evicts by insertion order: get() does not refresh recency
status: pending
priority: P2
tags: []
created: 2026-10-31
source: report/RPT-001
depends-on: []
---

# Fix: LRUCache evicts by insertion order: get() does not refresh recency

## Description

Source: RPT-001. `LRUCache.get` (`src/lruCache/lruCache.ts:79`) never refreshes recency, so `set` (`:91`) evicts the oldest inserted key instead of the least recently used one. Repro in the report: `set a, set b, get a, set c` evicts `a`.

## Acceptance Criteria

- [ ] A test reads a key, overflows capacity by one, and asserts the read key survives while the least recently used key is evicted; it fails before the fix
- [ ] get() and a live has() hit move the key to most-recent position in src/lruCache/lruCache.ts
- [ ] Existing lruCache tests pass unmodified
- [ ] Commit is fix: and no exported signature changes

## Notes

## Learnings

## Progress Log

- [2026-10-31] Created