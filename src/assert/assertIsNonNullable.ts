import { isNonNullable } from '../is';

type AssertIsNonNullable = <T>(x: T) => asserts x is NonNullable<T>;

/**
 * Asserts that a value is not null or undefined.
 * @param x The value to be asserted.
 * @throws {Error} If the value is null or undefined.
 */
export const assertIsNonNullable: AssertIsNonNullable = (x) => {
  if (!isNonNullable(x)) {
    throw new Error('Expected a non-nullable value');
  }
};
