---
id: RPT-002
title: memoize cache key collides for undefined/null/NaN/Infinity arguments
type: bug
severity: medium
status: triaged
created: 2026-10-31
triaged: 2026-10-31
task-id: TSK-002
---

## Observed

`memoize` builds its cache key with `JSON.stringify(args)` (`src/memoize/memoize.ts:26`). JSON serialises `undefined`, `null`, `NaN`, `Infinity` and `-Infinity` inside an array all as `null`, so distinct calls share one cache entry and return the wrong result. Functions and symbols also serialise to `null`, and `Map`/`Set` to `{}`.

## Reproduction

```js
// pnpm build && node -e '...'
const { memoize } = require('./dist/index.js');
const f = memoize((x) => (x === undefined ? 'undef' : String(x)));
console.log(f(null), f(undefined));   // null null   (expected: null undef)
const g = memoize((x) => typeof x);
console.log(g(NaN), g(null));         // number number (expected: number object)
```

`src/memoize/memoize.test.ts:110` ("returns cached undefined values") and `:123` ("handles null values") test each value in isolation, never both against one memoized instance.

## Fix direction

Use a key derivation that distinguishes these values (e.g. a `JSON.stringify` replacer that tags `undefined`, non-finite numbers, functions and symbols), or a per-argument `Map` trie keyed by identity. Add a test calling one memoized instance with `null` then `undefined`, and `NaN` then `null`. Document the key semantics in the JSDoc.
