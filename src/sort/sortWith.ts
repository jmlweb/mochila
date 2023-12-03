import { clone } from '../clone';
import { NonReadonly, ProtectIfNonEmptyArray } from '../types';

/**
 * Returns a new sorted array, providing the sortFn as the first argument.
 * - If the sortFn is ommited, the array is sorted in ascending order.
 * - If the sortFn is provided, the array is sorted according to the return value of the sortFn.
 * - If the source array is empty, it returns an empty array of the same type.
 *
 * @category Array
 *
 * @example
 * ```
 * const source = [3, 2, 1];
 * sortWith((a, b) => b - a)(source) // [3, 2, 1]
 * sortWith()(source) // [1, 2, 3]
 * ```
 */
export const sortWith =
  <V>(sortFn?: (a: V, b: V) => number) =>
  <S extends ReadonlyArray<V>>(source: S) =>
    (clone(source) as NonReadonly<S>).sort(sortFn) as ProtectIfNonEmptyArray<S>;
