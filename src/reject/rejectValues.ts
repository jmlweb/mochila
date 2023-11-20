import { RejectValues } from '../types';

/**
 * Filters the values in the source array that are not included in the values array.
 * @template V The type of the values array.
 * @param {ReadonlyArray<V>} values The array of values to reject.
 * @returns {function} A function that takes an array of type S and returns a new array without V.
 */
export const rejectValues =
  <V>(values: ReadonlyArray<V>) =>
  <S extends ReadonlyArray<unknown>>(source: S) =>
    source.filter((value) => !values.includes(value as V)) as RejectValues<
      V,
      S
    >;
