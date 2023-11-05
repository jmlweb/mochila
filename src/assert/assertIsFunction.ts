import { isFunction } from '../is';
import { AnyFn, Assertion } from '../types';

/**
 * Asserts that the given value is a function.
 * @param x - The value to be asserted.
 * @throws An error with message 'Expected a function' if the assertion fails.
 */
export const assertIsFunction: Assertion<AnyFn> = (x) => {
  if (!isFunction(x)) {
    throw new Error('Expected a function');
  }
};
