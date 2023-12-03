import { isTupleable } from '../is';
import { Tupleable } from '../types';

type AssertIsTupeable = <T>(x: ReadonlyArray<T>) => asserts x is Tupleable<T>;

/**
 * Asserts that the input is a tupleable array.
 * A tupleable array is an array with a length of at least 2.
 *
 * @category Assertion
 *
 * @param x - The input array to be asserted.
 * @throws Error if the input is not a tupleable array.
 *
 * @example
 * ```
 * const fn = (x: unknown) => {
 *   assertIsTupleable(x); // throws an error if x is not a tupleable array
 *   return x; // x has inferred type Tupleable<unknown>
 * };
 * ```
 */
export const assertIsTupleable: AssertIsTupeable = (x) => {
  if (!isTupleable(x)) {
    throw new Error('Expected a tupeable');
  }
};
