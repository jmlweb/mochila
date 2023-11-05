import { isArray } from '../is';
import { Assertion } from '../types';

/**
 * Asserts that the input is an array.
 * @param x The input to be asserted.
 * @throws An error if the input is not an array.
 */
export const assertIsArray: Assertion<ReadonlyArray<unknown>> = (x) => {
  if (!isArray(x)) {
    throw new Error('Expected an array');
  }
};
