/**
 * Determines if a value is an array.
 *
 * @category Guard
 * @category Array
 *
 * @typeParam T - The type of the value to check.
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is an array.
 *
 * @example
 * ```
 * isArray([1, 2, 3]); // => true
 * isArray('abc'); // => false
 * ```
 */
export const isArray = <T>(x: T): x is Extract<T, ReadonlyArray<unknown>> => {
  return Array.isArray(x);
};
