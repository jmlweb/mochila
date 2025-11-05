/**
 * Returns elements from source array that are not in the exclude array.
 * Preserves uniqueness and order from the source array.
 *
 * @category Array
 * @example
 * ```
 * difference([2, 3])([1, 2, 3, 4]);
 * // => [1, 4]
 * ```
 * @param exclude - Array of elements to exclude
 * @param source - Source array
 * @returns Array of elements not in exclude
 * @typeParam T - Element type
 */
export const difference =
  <T>(exclude: ReadonlyArray<T>) =>
  (source: ReadonlyArray<T>): T[] => {
    const excludeSet = new Set(exclude);
    const seen = new Set<T>();
    const result: T[] = [];

    for (const item of source) {
      if (!excludeSet.has(item) && !seen.has(item)) {
        result.push(item);
        seen.add(item);
      }
    }

    return result;
  };
