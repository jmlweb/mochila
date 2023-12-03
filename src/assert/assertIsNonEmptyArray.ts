import { isNonEmptyArray } from '../is';
import { NonEmptyArray } from '../types';

type AssertIsNonEmptyArray = <T>(
  x: ReadonlyArray<T>,
) => asserts x is NonEmptyArray<T>;

/**
 * Asserts that the input is a non-empty array.
 *
 * @category Assertion
 *
 * @param x - The value to be asserted.
 * @throws An error if the input is not an array or it is empty.
 *
 * @example
 * ```
 * const fn = (x: number[]) => {
 *   assertIsNonEmptyArray(x); // throws an error if x is not an array or it is empty
 *   return x; // x has inferred type NonEmptyArray<number>
 * }
 * ```
 */
export const assertIsNonEmptyArray: AssertIsNonEmptyArray = (x) => {
  if (!isNonEmptyArray(x)) {
    throw new Error('Expected a non-empty array');
  }
};
