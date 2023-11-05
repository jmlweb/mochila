import { AnyFn } from '../types';

/**
 * Returns the complement of a function.
 *
 * @template Fn - The type of the function.
 * @param {Fn} fn - The function.
 * @returns A function whose result is the negation of the result of fn.
 */
export const complement =
  <Fn extends AnyFn>(fn: Fn) =>
  (...args: Parameters<Fn>) =>
    !fn(...args);
