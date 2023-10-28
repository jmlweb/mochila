import { isNonEmptyArray } from '../isNonEmptyArray';
import { NonEmptyArray } from '../types';

type AssertIsNonEmptyArray = <T>(x: T[]) => asserts x is NonEmptyArray<T>;

export const assertIsNonEmptyArray: AssertIsNonEmptyArray = (x) => {
  if (!isNonEmptyArray(x)) {
    throw new Error('Expected a non-empty array');
  }
};
