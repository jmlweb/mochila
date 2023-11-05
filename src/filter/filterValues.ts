import { Filterable, FilterValues } from '../types';

/**
 * Filters an array of values based on a set of filterable values.
 * @template V The type of the filterable values.
 * @param {ReadonlyArray<V>} values The filterable values.
 * @returns {function} A function that takes a source array and returns a filtered array.
 */
export const filterValues =
  <V extends Filterable>(values: ReadonlyArray<V>) =>
  <S extends ReadonlyArray<unknown>>(source: S) =>
    source.filter((value) => values.includes(value as V)) as FilterValues<V, S>;
