import { isBoolean } from '../is';
import { Assertion } from '../types';

/**
 * Asserts that the input is a boolean.
 *
 * @category Assertion
 *
 * @param x - The input to be asserted.
 * @throws An error if the input is not a boolean.
 *
 * @example
 * ```
 * const fn = (x: unknown) => {
 *   assertIsBoolean(x);
 *   return x; // x has inferred type boolean
 * };
 * ```
 */
export const assertIsBoolean: Assertion<boolean> = (x) => {
  if (!isBoolean(x)) {
    throw new Error('Expected a boolean');
  }
};
