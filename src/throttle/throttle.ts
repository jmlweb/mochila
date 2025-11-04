import { AnyFn } from '../types';

/**
 * Limits the rate at which a function can be called.
 *
 * Throttling ensures a function is called at most once per duration period. During the throttle period, subsequent calls return the last computed result.
 *
 * @category Function
 *
 * @typeParam Fn - The type of the function to be throttled.
 * @param duration - The time in milliseconds to wait before allowing the next execution.
 * @param fn - The function to be throttled.
 * @returns A throttled function that returns the result of the throttled function.
 *
 * @example
 * ```
 * const a = throttle(1000, (x: number) => x * 2);
 * a(1); // 2 (executes immediately)
 * a(2); // 2 (returns previous result, function not called)
 * // After 1000ms
 * a(3); // 6 (executes again)
 * ```
 */
export const throttle = <Fn extends AnyFn>(duration: number, fn: Fn) => {
  let isBlocked = false;
  let latestResult: ReturnType<Fn>;
  let hasInitialized = false;

  return (...args: Parameters<Fn>): ReturnType<Fn> => {
    if (!isBlocked) {
      latestResult = fn(...args);
      hasInitialized = true;
      isBlocked = true;
      setTimeout(() => {
        isBlocked = false;
      }, duration);
      return latestResult;
    }
    if (!hasInitialized) {
      latestResult = fn(...args);
      hasInitialized = true;
      return latestResult;
    }
    return latestResult;
  };
};
