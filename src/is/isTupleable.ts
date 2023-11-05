import { Tupleable } from '../types';

/**
 * Determines if an array is tupleable.
 * @param x - The array to check.
 * @returns True if the array is tupleable, false otherwise.
 */
export const isTupleable = <T>(x: ReadonlyArray<T>): x is Tupleable<T> =>
  x.length > 1;
