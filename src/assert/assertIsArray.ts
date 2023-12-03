import { isArray } from '../is';
import { Assertion } from '../types';

/**
 * Asserts that the input is an array.
 *
 * @category Assertion
 *
 * @param x - The input to be asserted.
 * @throws An error if the input is not an array.
 *
 * @example
 * ```
 * const fn = (x: unknown) => {
 *  assertIsArray(x); // throws an error if x is not an array
 *  return x; // x has inferred type Array<unknown>
 * };
 * ```
 */
export const assertIsArray: Assertion<Array<unknown>> = (x) => {
  if (!isArray(x)) {
    throw new Error('Expected an array');
  }
};
