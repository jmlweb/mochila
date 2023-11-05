import { isTupleable } from '../is';
import { Tupleable } from '../types';

type AssertIsTupeable = <T>(x: ReadonlyArray<T>) => asserts x is Tupleable<T>;

/**
 * Asserts that the input is a tupleable array.
 *
 * @param x The input array to be asserted.
 * @throws {Error} If the input is not a tupleable array.
 */
export const assertIsTupleable: AssertIsTupeable = (x) => {
  if (!isTupleable(x)) {
    throw new Error('Expected a tupeable');
  }
};
