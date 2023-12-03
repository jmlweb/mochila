import { isNullable } from '../is';
import { Assertion } from '../types';

type AssertIsNullable = Assertion<null | undefined>;

/**
 * Asserts that a value is either null or undefined.
 *
 * @category Assertion
 *
 * @param x - The value to be asserted.
 * @throws An error with message 'Expected a non-nullable value' if the value is not null or undefined.
 *
 * @example
 * ```
 * const fn = (x?: number | null) => {
 *   assertIsNullable(x); // throws an error if x is not null or undefined
 *   return x; // x has inferred type null | undefined
 * };
 * ```
 */
export const assertIsNullable: AssertIsNullable = (x) => {
  if (!isNullable(x)) {
    throw new Error('Expected a non-nullable value');
  }
};
