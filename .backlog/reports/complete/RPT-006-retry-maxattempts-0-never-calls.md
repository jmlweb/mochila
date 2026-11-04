---
id: RPT-006
title: retry: maxAttempts <= 0 never calls fn and rejects with undefined
type: bug
severity: medium
status: triaged
created: 2026-11-03
triaged: 2026-11-03
task-id: TSK-006
---

## Observed

`src/retry/retry.ts:51` and `src/retry/retry.ts:67`:

```ts
for (let attempt = 0; attempt < maxAttempts; attempt += 1) { ... }
throw lastError;
```

`maxAttempts` is not validated. With `0` (or a negative number / `NaN`) the loop body never runs, `fn` is never called, and `lastError` is still `undefined`, so the wrapper rejects with `undefined` — no error message, no stack. The project convention is to throw an `Error` with a specific message on impossible inputs (e.g. `lruCache`: `'max must be a positive integer'`). `initialDelayMs`, `backoffMultiplier` and `maxDelayMs` are likewise unvalidated.

## Reproduction

```js
// after `pnpm build`
const m = require('./dist/index.js');
let calls = 0;
m.retry({ maxAttempts: 0 })(async () => { calls++; return 1; })()
  .then((v) => console.log('ok', v), (e) => console.log('rejected with', e, 'calls', calls));
```

Output: `rejected with undefined calls 0`.

## Fix direction

Validate in the config step: throw `new Error('maxAttempts must be a positive integer')` when `!Number.isInteger(maxAttempts) || maxAttempts < 1`; similarly reject negative/NaN delays. Add tests for 0, negative and NaN.
