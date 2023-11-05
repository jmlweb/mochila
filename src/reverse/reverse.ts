import { clone } from '../clone';
import { Reverse } from '../types';

/**
 * Immutable version of array reverse.
 * @param value - The array to reverse.
 * @returns A new array with the elements reversed.
 */
export const reverse = <T, V extends ReadonlyArray<T>>(value: V): Reverse<V> =>
  (clone(value) as unknown as T[]).reverse() as unknown as Reverse<V>;
