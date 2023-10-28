import { isString } from '../isString';
import { Assertion } from '../types';

export const assertIsString: Assertion<string> = (x) => {
  if (!isString(x)) {
    throw new Error('Expected a string');
  }
};
