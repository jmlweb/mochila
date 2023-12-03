import { NonEmptyArray } from '../types';

/**
 * Determines if an array is not empty.
 *
 * The type inferred for the array is `ReadonlyArray<T>`, but the type returned is `NonEmptyArray<T>`.
 *
 * @category Guard
 * @category Array
 * @see {@link NonEmptyArray}
 *
 * @typeParam T - The type of the items in the array to check.
 * @param x - The array to check.
 * @returns True if the array is not empty, false otherwise.
 *
 * @example
 * ```
 * isNonEmptyArray([1, 2, 3]); // => true
 * isNonEmptyArray([]); // => false
 * ```
 */
export const isNonEmptyArray = <T>(
  x: ReadonlyArray<T>,
): x is NonEmptyArray<T> => x.length > 0;
