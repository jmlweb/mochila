import { clone } from '../clone';
import { Reverse } from '../types';

/**
 * Immutable version of array reverse.
 *
 * @category Array
 *
 * @param value - The array to reverse.
 * @returns A new array with the elements reversed.
 *
 * @example
 * ```
 * const source = [1, 2, 3];
 * reverse(source) // [3, 2, 1]
 * ```
 */
export const reverse = <T, V extends ReadonlyArray<T>>(value: V): Reverse<V> =>
  (clone(value) as unknown as T[]).reverse() as unknown as Reverse<V>;
