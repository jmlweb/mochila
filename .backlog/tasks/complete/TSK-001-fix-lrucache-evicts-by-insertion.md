---
id: TSK-001
title: Fix: LRUCache evicts by insertion order: get() does not refresh recency
status: complete
priority: P2
tags: []
created: 2026-10-31
source: report/RPT-001
depends-on: []
started: 2026-11-03
completed: 2026-11-03
---

# Fix: LRUCache evicts by insertion order: get() does not refresh recency

## Description

Source: RPT-001. `LRUCache.get` (`src/lruCache/lruCache.ts:79`) never refreshes recency, so `set` (`:91`) evicts the oldest inserted key instead of the least recently used one. Repro in the report: `set a, set b, get a, set c` evicts `a`.

## Acceptance Criteria

- [x] A test reads a key, overflows capacity by one, and asserts the read key survives while the least recently used key is evicted; it fails before the fix — evidence: pnpm exec jest src/lruCache → 3 failed before fix, 11 passed after (2026-11-03)
- [x] get() and a live has() hit move the key to most-recent position in src/lruCache/lruCache.ts — evidence: getLiveItem re-inserts key in keys Set on live get/has hit; get+has recency tests pass (2026-11-03)
- [x] Existing lruCache tests pass unmodified — evidence: git diff --numstat lruCache.test.ts → 65 added, 0 removed; pnpm test:coverage → 566 passed (2026-11-03)
- [x] Commit is fix: and no exported signature changes — evidence: commit fix(lrucache); LRUCache signature unchanged; pnpm type-check 99.87%, pnpm build ok (2026-11-03)

## Notes

## Learnings

- LRN-001: LRUCache recency is the iteration order of its keys Set
- LRN-002: commitlint subject-case rejects uppercase task ids in commit subject
## Progress Log

- [2026-10-31] Created
- [2026-11-03] Started
- [2026-11-03] criterion 1 — evidence: pnpm exec jest src/lruCache before fix → 3 failed (get/has recency, undefined value), after fix → 11 passed (2026-11-03)
- [2026-11-03] criterion 2 — evidence: getLiveItem in src/lruCache/lruCache.ts re-inserts key into recency Set on live get()/has() hit; has() test keeps 'a' and evicts 'b' → passed (2026-11-03)
- [2026-11-03] criterion 3 — evidence: git diff --numstat lruCache.test.ts → 65 added 0 removed; pnpm test:coverage → 566 passed (2026-11-03)
- [2026-11-03] criterion 4 — evidence: commit subject fix(lruCache): ...; exported LRUCache signature and return shape unchanged; pnpm build → d.ts emitted, type-check 99.87% (2026-11-03)
- [2026-11-03] Completed