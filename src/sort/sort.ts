import { clone } from '../clone';
import { NonReadonly, ProtectIfNonEmptyArray } from '../types';

/**
 * Returns a new sorted array
 * - If the sortFn is ommited, the array is sorted in ascending order.
 * - If the sortFn is provided, the array is sorted according to the return value of the sortFn.
 * - If the source array is empty, it returns an empty array of the same type.
 *
 * @category Array
 *
 * @example
 * ```
 * const source = [3, 2, 1];
 * sort(source) // [1, 2, 3]
 * sort(source)((a, b) => b - a) // [3, 2, 1]
 * ```
 */
export const sort =
  <S extends ReadonlyArray<unknown>>(source: S) =>
  (sortFn?: (a: S[number], b: S[number]) => number) =>
    (clone(source) as NonReadonly<S>).sort(sortFn) as ProtectIfNonEmptyArray<S>;
