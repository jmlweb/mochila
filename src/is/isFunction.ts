import { AnyFn } from '../types';

/**
 * Determines if a value is a function.
 *
 * @category Guard
 * @category Function
 * @see {@link AnyFn}
 *
 * @typeParam T - The type of the value to check.
 * @param fn - The value to check.
 * @returns True if the value is a function, false otherwise.
 *
 * @example
 * ```
 * isFunction(() => {}); // => true
 * isFunction({}); // => false
 * ```
 */
export const isFunction = <T>(fn: T): fn is Extract<T, AnyFn> => {
  return typeof fn === 'function';
};
