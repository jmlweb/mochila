import { isPlainObject } from '../is';
import { Assertion, UnknownRecord } from '../types';

/**
 * Asserts that the input is a plain object.
 *
 * @category Assertion
 *
 * @param x - The input to be asserted.
 * @throws An error with message 'Expected a plain object' if the input is not a plain object.
 *
 * @example
 * ```
 * const fn = (x: Date | { foo: string } | number | string) => {
 *   assertIsPlainObject(x);
 *   return x; // x has inferred type { foo: string } as it is the only plain object
 * };
 * ```
 */
export const assertIsPlainObject: Assertion<UnknownRecord> = (x) => {
  if (!isPlainObject(x)) {
    throw new Error('Expected a plain object');
  }
};
