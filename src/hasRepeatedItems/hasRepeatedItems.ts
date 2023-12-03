/**
 * Check if there is at least one repeated item in the source array.
 *
 * @category Array
 *
 * @param source - The array to check.
 * @returns `true` if there is at least one repeated item in the source array, `false` otherwise.
 *
 * @example
 * ```
 * hasRepeatedItems([1, 2, 3]); // => false
 * hasRepeatedItems([1, 2, 3, 1]); // => true
 * ```
 */
export const hasRepeatedItems = (source: ReadonlyArray<unknown>) =>
  new Set(source).size !== source.length;
