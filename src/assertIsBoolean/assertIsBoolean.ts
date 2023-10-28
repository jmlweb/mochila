import { isBoolean } from '../isBoolean';
import { Assertion } from '../types';

export const assertIsBoolean: Assertion<boolean> = (x) => {
  if (!isBoolean(x)) {
    throw new Error('Expected a boolean');
  }
};
