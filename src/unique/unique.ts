/**
 * Returns a new array with unique values from the source array.
 *
 * @category Array
 *
 * @typeParam V - The type of the elements in the source array.
 * @param source - The source array.
 * @returns A new array with unique values.
 *
 * @example
 * ```
 * unique([1, 2, 3, 2, 1]) // [1, 2, 3]
 * ```
 */
export const unique = <V>(source: ReadonlyArray<V>) =>
  Array.from(new Set(source));
