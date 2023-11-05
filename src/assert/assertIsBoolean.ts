import { isBoolean } from '../is';
import { Assertion } from '../types';

/**
 * Asserts that the input is a boolean.
 * @param x - The input to be asserted.
 * @throws An error if the input is not a boolean.
 */
export const assertIsBoolean: Assertion<boolean> = (x) => {
  if (!isBoolean(x)) {
    throw new Error('Expected a boolean');
  }
};
