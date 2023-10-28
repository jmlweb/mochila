import { isNonNullable } from '../isNonNullable';

type AssertIsNonNullable = <T>(x: T) => asserts x is NonNullable<T>;

export const assertIsNonNullable: AssertIsNonNullable = (x) => {
  if (!isNonNullable(x)) {
    throw new Error('Expected a non-nullable value');
  }
};
