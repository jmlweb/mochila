type Subscriber<V> = (data: V) => void;

/**
 * Creates a Subscription object that allows subscribing, unsubscribing, notifying and resetting subscribers.
 *
 * `initialSubscribers` is copied, so the array you pass is never mutated and
 * later changes to it have no effect. `notify` calls the subscribers
 * registered when it started, each once, even if one unsubscribes itself or
 * another during the call; subscribers added during the call wait for the
 * next `notify`.
 *
 * @category Subscription
 *
 * @example
 * ```
 * const subscription = Subscription();
 * const subscriber = (data: string) => console.log(data);
 * subscription.subscribe(subscriber);
 * subscription.notify('Hello, world!'); // 'Hello, world!'
 * subscription.unsubscribe(subscriber);
 * subscription.notify('Hello, world!'); // (nothing)
 * ```
 */
export const Subscription = <V>(initialSubscribers: Subscriber<V>[] = []) => {
  const subscribers: Subscriber<V>[] = [...initialSubscribers];

  const subscribe = (subscriber: Subscriber<V>) => {
    subscribers.push(subscriber);
  };

  const unsubscribe = (subscriber: Subscriber<V>) => {
    const index = subscribers.indexOf(subscriber);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };

  const notify = (data: V) => {
    [...subscribers].forEach((subscriber) => {
      subscriber(data);
    });
  };

  const reset = () => {
    subscribers.length = 0;
  };

  return {
    subscribe,
    unsubscribe,
    notify,
    reset,
  };
};
