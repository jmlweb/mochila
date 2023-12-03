import { AnyFn } from '../types';

/**
 * Limits the rate at which a function can be called.
 *
 * @category Function
 * @category Promise
 * @category Cache
 *
 * @typeParam Fn - The type of the function to be debounced.
 * @param duration - The time in milliseconds to wait before executing the function.
 * @param fn - The function to be debounced.
 * @returns A function that returns a promise with the result of the debounced function.
 *
 * @example
 * ```
 * const a = throttle(1000, (x: number) => x * 2);
 * a(1).then(console.log); // 2
 * a(2).then(console.log); // still 2, until 1000ms have passed
 * ```
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
