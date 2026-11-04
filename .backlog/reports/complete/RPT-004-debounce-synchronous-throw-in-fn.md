---
id: RPT-004
title: debounce: synchronous throw in fn escapes as uncaught exception and pending promises never settle
type: bug
severity: high
status: triaged
created: 2026-11-03
triaged: 2026-11-03
task-id: TSK-004
---

## Observed

`src/debounce/debounce.ts:35`:

```ts
Promise.resolve(fn(...args)).then(
```

`fn(...args)` is evaluated inside the `setTimeout` callback before `Promise.resolve` wraps it. If `fn` throws synchronously, the error escapes the timer callback as an uncaught exception (crashes a Node process without an `uncaughtException` handler), and none of the promises returned by the debounced function are ever resolved or rejected — callers awaiting them hang forever. `pending` was already cleared, so they are also unreachable for later calls.

## Reproduction

```js
// after `pnpm build`
const m = require('./dist/index.js');
process.on('uncaughtException', (e) => console.log('UNCAUGHT:', e.message));
const d = m.debounce(10, () => { throw new Error('boom'); });
let settled = false;
d().then(() => (settled = true), () => (settled = true));
setTimeout(() => console.log('debounce promise settled:', settled), 100);
```

Output:

```
UNCAUGHT: boom
debounce promise settled: false
```

Expected: the returned promise rejects with `boom`, no uncaught exception.

## Fix direction

Invoke `fn` inside the promise chain, e.g. `Promise.resolve().then(() => fn(...args))` or wrap in `new Promise((res) => res(fn(...args)))`, so sync throws route to the reject branch. Add a test with a synchronously throwing `fn`.
