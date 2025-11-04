import { AnyFn } from '../types';

/**
 * Debounces a function call, delaying its execution until a certain amount of time has passed without any new calls.
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
 * const a = debounce(1000, (x: number) => x * 2);
 * a(1).then(console.log); // 2
 * a(2).then(console.log); // still 2, until 1000ms have passed
 * ```
 */
export const debounce = <Fn extends AnyFn>(duration: number, fn: Fn) => {
  let timeout: NodeJS.Timeout;
  let pending: {
    resolve: (value: ReturnType<Fn>) => void;
    reject: AnyFn;
  }[] = [];
  const MAX_PENDING = 1000;
  return (...args: Parameters<Fn>): Promise<ReturnType<Fn>> => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const currentPending = [...pending];
        pending = [];
        Promise.resolve(fn(...args)).then(
          (data: ReturnType<Fn>) =>
            currentPending.forEach(({ resolve }) => resolve(data)),
          (error: unknown) =>
            currentPending.forEach(({ reject }) => reject(error)),
        );
      }, duration);
      if (pending.length >= MAX_PENDING) {
        const oldest = pending.shift();
        if (oldest) {
          oldest.reject(
            new Error(
              'Debounce: too many pending promises, oldest promise rejected',
            ),
          );
        }
      }
      pending.push({ resolve, reject });
    });
  };
};
