import { AnyFn } from '../types';

/**
 * Determines if a value is a function.
 *
 * @category Guard
 * @category Function
 * @see {@link AnyFn}
 *
 * @param fn - The value to check.
 * @returns True if the value is a function, false otherwise.
 *
 * @example
 * ```
 * isFunction(() => {}); // => true
 * isFunction({}); // => false
 * ```
 */
export const isFunction = (fn: unknown): fn is AnyFn => {
  return typeof fn === 'function';
};
