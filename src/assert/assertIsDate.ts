import { isDate } from '../is';
import { Assertion } from '../types';

/**
 * Asserts that the input is a Date object.
 * @param x - The input value to be asserted.
 * @throws An error if the input is not a Date object.
 */
export const assertIsDate: Assertion<Date> = (x) => {
  if (!isDate(x)) {
    throw new Error('Expected a date');
  }
};
