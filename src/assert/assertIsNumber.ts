import { isNumber } from '../is';
import { Assertion } from '../types';

/**
 * Asserts that the given value is a number.
 *
 * @category Assertion
 *
 * @param x - The value to be asserted.
 * @throws An error with message 'Expected a number' if the value is not a number.
 *
 * @example
 * ```
 * const fn = (x: unknown) => {
 *   assertIsNumber(x); // throws an error if x is not a number
 *   return x; // x has inferred type number
 * };
 * ```
 */
export const assertIsNumber: Assertion<number> = (x) => {
  if (!isNumber(x)) {
    throw new Error('Expected a number');
  }
};
