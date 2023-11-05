import { isPlainObject } from '../is';
import { Assertion, UnknownRecord } from '../types';

/**
 * Asserts that the input is a plain object.
 * @param x - The input to be asserted.
 * @throws An error with message 'Expected a plain object' if the input is not a plain object.
 */
export const assertIsPlainObject: Assertion<UnknownRecord> = (x) => {
  if (!isPlainObject(x)) {
    throw new Error('Expected a plain object');
  }
};
