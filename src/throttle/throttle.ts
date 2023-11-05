import { AnyFn } from '../types';

/**
 * Limits the rate at which a function can be called.
 * @param duration - The minimum time between function calls in milliseconds.
 * @param fn - The function to be throttled.
 * @returns A new function that can be called at most once per `duration` milliseconds.
 */
export const throttle = <Fn extends AnyFn>(duration: number, fn: Fn) => {
  let isBlocked = false;
  let latestResult: ReturnType<Fn>;

  return (...args: Parameters<Fn>) => {
    if (!isBlocked) {
      latestResult = fn(...args);
      isBlocked = true;
      setTimeout(() => {
        isBlocked = false;
      }, duration);
    }
    return latestResult;
  };
};
