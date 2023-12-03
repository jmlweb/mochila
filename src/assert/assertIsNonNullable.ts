import { isNonNullable } from '../is';

type AssertIsNonNullable = <T>(x: T) => asserts x is NonNullable<T>;

/**
 * Asserts that a value is not null or undefined.
 *
 * @category Assertion
 *
 * @param x - The value to be asserted.
 * @throws Error if the value is null or undefined.
 *
 * @example
 * ```
 * const fn = (x?: number | null) => {
 *   assertIsNonNullable(x); // throws an error if x is null or undefined
 *   return x; // x has inferred type number
 * };
 * ```
 */
export const assertIsNonNullable: AssertIsNonNullable = (x) => {
  if (!isNonNullable(x)) {
    throw new Error('Expected a non-nullable value');
  }
};
