import { NonEmptyArray } from '../types';

export const isNonEmptyArray = <T>(
  x: ReadonlyArray<T>,
): x is NonEmptyArray<T> => x.length > 0;
