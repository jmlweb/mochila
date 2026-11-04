---
id: LRN-001
title: LRUCache recency is the iteration order of its keys Set
status: active
tags: [lrucache, cache, mochila]
task: TSK-001
created: 2026-11-03
---

mochila-ts LRUCache tracks recency purely through the insertion order of a `Set<unknown>` of keys; `set` evicts `keys.values().next().value`. Any read that should count as "use" must `keys.delete(key); keys.add(key)` to move the key to the tail. Detect a hit with the Map entry (`items.get(key)` returning an Item object), not with `item.value`, because a cached value may legitimately be `undefined`. Misses and expired entries must not touch the Set.
