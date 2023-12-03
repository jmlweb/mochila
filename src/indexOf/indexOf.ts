/**
 * Returns the index of the first occurrence of a value in an array.
 *
 * Returns `-1` if the value is not found.
 *
 * @category Array
 *
 * @example
 * ```
 * indexOf(1)([1, 2, 3]); // => 0
 * indexOf(1)([2, 3]); // => -1
 * ```
 */
export const indexOf =
  (value: unknown, fromIndex?: number) => (source: ReadonlyArray<unknown>) =>
    source.indexOf(value, fromIndex);
