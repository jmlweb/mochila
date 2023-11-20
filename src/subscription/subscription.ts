import { rejectValues } from '../reject';

type Subscriber<V> = (data: V) => void;

/**
 * Creates a Subscription object that allows subscribing, unsubscribing, notifying and resetting subscribers.
 * @template V The type of data that will be passed to the subscribers.
 * @param {Subscriber<V>[]} [initialSubscribers=[]] An optional array of initial subscribers.
 * @returns {Object} An object with methods to manage subscribers.
 */
export const Subscription = <V>(initialSubscribers: Subscriber<V>[] = []) => {
  const subscribers: Subscriber<V>[] = initialSubscribers;

  const subscribe = (subscriber: Subscriber<V>) => {
    subscribers.push(subscriber);
  };

  const unsubscribe = (subscriber: Subscriber<V>) =>
    rejectValues([subscriber])(subscribers);

  const notify = (data: V) => {
    subscribers.forEach((subscriber) => subscriber(data));
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
