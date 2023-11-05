import { isObject } from '../is';
import { Assertion } from '../types';

/**
 * Asserts that the input is an object.
 * @param x - The input to be asserted.
 * @throws An error with message "Expected an object" if the input is not an object.
 */
export const assertIsObject: Assertion<object> = (x) => {
  if (!isObject(x)) {
    throw new Error('Expected an object');
  }
};
