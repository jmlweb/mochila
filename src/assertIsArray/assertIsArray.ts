import { isArray } from '../isArray';
import { Assertion } from '../types';

export const assertIsArray: Assertion<ReadonlyArray<unknown>> = (x) => {
  if (!isArray(x)) {
    throw new Error('Expected an array');
  }
};
