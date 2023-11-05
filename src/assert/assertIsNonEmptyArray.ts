import { isNonEmptyArray } from '../is';
import { NonEmptyArray } from '../types';

type AssertIsNonEmptyArray = <T>(
  x: ReadonlyArray<T>,
) => asserts x is NonEmptyArray<T>;

/**
 * Asserts that the input is a non-empty array.
 * @param {ReadonlyArray<T>} x The value to be asserted.
 * @throws {Error} If the value is null or undefined.
 */
export const assertIsNonEmptyArray: AssertIsNonEmptyArray = (x) => {
  if (!isNonEmptyArray(x)) {
    throw new Error('Expected a non-empty array');
  }
};
