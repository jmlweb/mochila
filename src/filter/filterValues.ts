import { Filterable, FilterValues } from '../types';

/**
 * Return a new array with all elements that are included in the given values.
 *
 * @category Array
 * @see {@link Filterable}
 * @see {@link FilterValues}
 *
 * @example
 * ```
 * const a = filterValues([1, 2, 3])([1, 2, 3, 4, 5]); // [1, 2, 3]
 * const b = filterValues(['a', 'b', 'c'])(['a', 'b', 'c', 'd', 'e']); // ['a', 'b', 'c']
 * ```
 */
export const filterValues =
  <V extends Filterable>(values: ReadonlyArray<V>) =>
  <S extends ReadonlyArray<unknown>>(source: S) =>
    source.filter((value) => values.includes(value as V)) as FilterValues<V, S>;
