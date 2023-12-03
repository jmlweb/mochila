/**
 * Returns the length of a string or an array.
 *
 * @category Array
 * @category String
 *
 * @param source - The string or array.
 * @returns The length of the string or array.
 *
 * @example
 * ```
 * length('abc'); // 3
 * length([1, 2, 3]); // 3
 * ```
 *
 */
export const length = (source: string | ReadonlyArray<unknown>) =>
  source.length;
