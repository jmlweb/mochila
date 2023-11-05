import { clone } from '../clone';
import { NonReadonly, ProtectIfNonEmptyArray } from '../types';

/**
 * Sorts an array using a custom sorting function.
 * @param sortFn The custom sorting function.
 * @returns {function} A function that takes an array to be sorted and returns a new array.
 */
export const sortWith =
  <V>(sortFn?: (a: V, b: V) => number) =>
  <S extends ReadonlyArray<V>>(source: S) =>
    (clone(source) as NonReadonly<S>).sort(sortFn) as ProtectIfNonEmptyArray<S>;
