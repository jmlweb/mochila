import { AnyFn } from '../types';

/**
 * Debounces a function call, delaying its execution until a certain amount of time has passed without any new calls.
 * @template Fn The type of the function to be debounced.
 * @param {number} duration The time in milliseconds to wait before executing the function.
 * @param {Fn} fn The function to be debounced.
 * @returns {function} A function that returns a promise with the result of the debounced function.
 */
export const debounce = <Fn extends AnyFn>(duration: number, fn: Fn) => {
  let timeout: NodeJS.Timeout;
  let pending: {
    resolve: (value: ReturnType<Fn>) => void;
    reject: AnyFn;
  }[] = [];
  return (...args: Parameters<Fn>): Promise<ReturnType<Fn>> => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const currentPending = [...pending];
        pending = [];
        Promise.resolve(fn(...args)).then(
          (data) => currentPending.forEach(({ resolve }) => resolve(data)),
          (error) => currentPending.forEach(({ reject }) => reject(error)),
        );
      }, duration);
      pending.push({ resolve, reject });
    });
  };
};
