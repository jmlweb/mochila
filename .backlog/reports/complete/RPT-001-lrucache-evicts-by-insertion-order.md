---
id: RPT-001
title: LRUCache evicts by insertion order: get() does not refresh recency
type: bug
severity: high
status: triaged
created: 2026-10-31
triaged: 2026-10-31
task-id: TSK-001
---

## Observed

`LRUCache` is documented as "Creates a Least Recently Used (LRU) cache" (`src/lruCache/lruCache.ts:13`), but `get` (`src/lruCache/lruCache.ts:79-86`) only reads `items` and never moves the key to the end of the `keys` set. `set` (`src/lruCache/lruCache.ts:88-91`) evicts `keys.values().next().value`, i.e. the oldest *inserted* key. The cache is FIFO, not LRU.

## Reproduction

```js
// pnpm build && node -e '...'
const { LRUCache } = require('./dist/index.js');
const c = LRUCache({ max: 2 });
c.set('a', 1); c.set('b', 2);
c.get('a');          // 'a' is now the most recently used
c.set('c', 3);       // should evict 'b'
console.log(c.has('a'), c.has('b'));
```

Output: `false true` — the just-read key `a` was evicted, the untouched key `b` survived. Expected `true false`.

The existing eviction test (`src/lruCache/lruCache.test.ts:16`) never reads a key between inserts, so it cannot catch this.

## Fix direction

In `get` (and `has` on a hit), when the item is live, `keys.delete(key); keys.add(key);` so iteration order tracks recency. Add a test that reads a key before overflowing capacity.
