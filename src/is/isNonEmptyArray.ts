import { NonEmptyArray } from '../types';

/**
 * Determines if an array is not empty.
 * @param x - The array to check.
 * @returns True if the array is not empty, false otherwise.
 */
export const isNonEmptyArray = <T>(
  x: ReadonlyArray<T>,
): x is NonEmptyArray<T> => x.length > 0;
