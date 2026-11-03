---
id: RPT-005
title: Subscription: subscriber that unsubscribes during notify causes the next subscriber to be skipped
type: bug
severity: medium
status: triaged
created: 2026-11-03
triaged: 2026-11-03
task-id: TSK-005
---

## Observed

`src/subscription/subscription.ts:33`:

```ts
subscribers.forEach((subscriber) => {
  subscriber(data);
});
```

`notify` iterates the live `subscribers` array. `unsubscribe` (`splice`, line ~25) mutates that same array, so when a subscriber removes itself (the common "once" pattern) during `notify`, every element shifts left and `forEach` skips the subscriber that followed it. That subscriber silently misses the notification.

Related: `initialSubscribers` (line 4) is stored by reference, so `subscribe`/`unsubscribe`/`reset` also mutate the caller's array.

## Reproduction

```js
// after `pnpm build`
const m = require('./dist/index.js');
const s = m.Subscription();
const seen = [];
const a = () => { seen.push('a'); s.unsubscribe(a); };
const b = () => seen.push('b');
s.subscribe(a); s.subscribe(b);
s.notify(1);
console.log('notified:', seen);
```

Output: `notified: [ 'a' ]` — expected `[ 'a', 'b' ]`.

## Fix direction

Iterate a snapshot in `notify` (`[...subscribers].forEach(...)`) and copy `initialSubscribers` on construction (`[...initialSubscribers]`). Add tests for self-unsubscribe during notify and for not mutating the passed array.
