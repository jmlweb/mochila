import { isNullable } from '../isNullable';
import { Assertion } from '../types';

type AssertIsNullable = Assertion<null | undefined>;

export const assertIsNullable: AssertIsNullable = (x) => {
  if (!isNullable(x)) {
    throw new Error('Expected a non-nullable value');
  }
};
