import { RejectValues } from '../types';

/**
 * Filters the values in the source array that are not included in the values array.
 *
 * @category Array
 *
 * @example
 * ```
 * const source = [1, 2, 3];
 * const values = [2, 3];
 * rejectValues(values)(source) // [1]
 * ```
 */
export const rejectValues =
  <V>(values: ReadonlyArray<V>) =>
  <S extends ReadonlyArray<unknown>>(source: S) =>
    source.filter((value) => !values.includes(value as V)) as RejectValues<
      V,
      S
    >;
