import { isString } from '../is';
import { Assertion } from '../types';

/**
 * Checks if the provided value is a string.
 * @param x The value to check.
 * @throws {Error} If the value is not a string.
 */
export const assertIsString: Assertion<string> = (x) => {
  if (!isString(x)) {
    throw new Error('Expected a string');
  }
};
