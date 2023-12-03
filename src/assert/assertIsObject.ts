import { isObject } from '../is';
import { Assertion } from '../types';

/**
 * Asserts that the input is an object.
 *
 * @category Assertion
 *
 * @param x - The input to be asserted.
 * @throws An error with message "Expected an object" if the input is not an object.
 *
 * @example
 * ```
 * const fn = (x: Date | { foo: string} | number | string) => {
 *   assertIsObject(x);
 *   return x; // x has inferred type Date | { foo: string } as both comply with object type
 * };
 * ```
 */
export const assertIsObject: Assertion<object> = (x) => {
  if (!isObject(x)) {
    throw new Error('Expected an object');
  }
};
