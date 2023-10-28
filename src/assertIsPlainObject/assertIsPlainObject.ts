import { isPlainObject } from '../isPlainObject';
import { Assertion, UnknownRecord } from '../types';

export const assertIsPlainObject: Assertion<UnknownRecord> = (x) => {
  if (!isPlainObject(x)) {
    throw new Error('Expected a plain object');
  }
};
