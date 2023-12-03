import { isString } from '../is';
import { Assertion } from '../types';

/**
 * Checks if the provided value is a string.
 *
 * @category Assertion
 *
 * @param x - The value to check.
 * @throws Error if the value is not a string.
 *
 * @example
 * ```
 * const fn = (x: unknown) => {
 *   assertIsString(x); // throws an error if x is not a string
 *   return x; // x has inferred type string
 * };
 * ```
 */
export const assertIsString: Assertion<string> = (x) => {
  if (!isString(x)) {
    throw new Error('Expected a string');
  }
};
