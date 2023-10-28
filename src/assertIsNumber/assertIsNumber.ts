import { isNumber } from '../isNumber';
import { Assertion } from '../types';

export const assertIsNumber: Assertion<number> = (x) => {
  if (!isNumber(x)) {
    throw new Error('Expected a number');
  }
};
