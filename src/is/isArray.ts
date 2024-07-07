/**
 * Determines if a value is an array.
 *
 * @category Guard
 * @category Array
 *
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is an array.
 *
 * @example
 * ```
 * isArray([1, 2, 3]); // => true
 * isArray('abc'); // => false
 * ```
 */
export const isArray = (x: unknown): x is ReadonlyArray<unknown> => {
  return Array.isArray(x);
};
