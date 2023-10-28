import { isObject } from '../isObject';
import { Assertion } from '../types';

export const assertIsObject: Assertion<object> = (x) => {
  if (!isObject(x)) {
    throw new Error('Expected an object');
  }
};
