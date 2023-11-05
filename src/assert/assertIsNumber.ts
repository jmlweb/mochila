import { isNumber } from '../is';
import { Assertion } from '../types';

/**
 * Asserts that the given value is a number.
 * @param x - The value to be asserted.
 * @throws An error with message 'Expected a number' if the value is not a number.
 */
export const assertIsNumber: Assertion<number> = (x) => {
  if (!isNumber(x)) {
    throw new Error('Expected a number');
  }
};
