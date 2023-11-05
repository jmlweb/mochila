import { clone } from '../clone';
import { NonReadonly, ProtectIfNonEmptyArray } from '../types';

/**
 * Sorts an array of elements of type S.
 * @param source The array to be sorted.
 * @returns {function} A function that takes a sort function and returns a new array of type S.
 */
export const sort =
  <S extends ReadonlyArray<unknown>>(source: S) =>
  (sortFn?: (a: S[number], b: S[number]) => number) =>
    (clone(source) as NonReadonly<S>).sort(sortFn) as ProtectIfNonEmptyArray<S>;
