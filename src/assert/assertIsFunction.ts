import { isFunction } from '../is';
import { AnyFn, Assertion } from '../types';

/**
 * Asserts that the given value is a function.
 *
 * @category Assertion
 *
 * @param x - The value to be asserted.
 * @throws An error with message 'Expected a function' if the assertion fails.
 *
 * @example
 * ```
 * const fn = (x: number | (x: number) => number) => {
 *   assertIsFunction(x); // throws an error if x is not a function
 *   return x; // x has inferred type (x: number) => number
 * };
 * ```
 */
export const assertIsFunction: Assertion<AnyFn> = (x) => {
  if (!isFunction(x)) {
    throw new Error('Expected a function');
  }
};
