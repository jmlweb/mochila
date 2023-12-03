import { Tupleable } from '../types';

/**
 * Determines if an array is tupleable (contains at least 2 items).
 *
 * @category Guard
 * @category Array
 * @see {@link Tupleable}
 *
 * @param x - The array to check.
 * @returns True if the array is tupleable, false otherwise.
 */
export const isTupleable = <T>(x: ReadonlyArray<T>): x is Tupleable<T> =>
  x.length > 1;
