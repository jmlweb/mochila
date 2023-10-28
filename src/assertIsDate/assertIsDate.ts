import { isDate } from '../isDate';
import { Assertion } from '../types';

export const assertIsDate: Assertion<Date> = (x) => {
  if (!isDate(x)) {
    throw new Error('Expected a date');
  }
};
