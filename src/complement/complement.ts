import { AnyFn } from '../types';

/**
 * Returns the complement of a function.
 *
 * - If the result of the function is truthy, the result of the complement is falsy.
 * - If the result of the function is falsy, the result of the complement is truthy.
 *
 * @category Function
 *
 * @typeParam Fn - The type of the function.
 * @param fn - The function.
 * @returns A function whose result is the negation of the result of fn.
 *
 * @example
 * ```
 * const a = (x: number) => x > 0;
 * const b = complement(a);
 * console.log(a(1)); // true
 * console.log(b(1)); // false
 * ```
 */
export const complement =
  <Fn extends AnyFn>(fn: Fn) =>
  (...args: Parameters<Fn>) =>
    !fn(...args);
