/**
 * Combines two arrays removing duplicates.
 * Preserves order with source array elements first, then new elements from other.
 *
 * @category Array
 * @example
 * ```
 * union([3, 4])([1, 2, 3]);
 * // => [1, 2, 3, 4]
 * ```
 * @param other - Array to combine with
 * @param source - Source array
 * @returns Combined array with unique elements
 * @typeParam T - Element type
 */
export const union =
  <T>(other: ReadonlyArray<T>) =>
  (source: ReadonlyArray<T>): T[] => {
    const seen = new Set<T>();
    const result: T[] = [];

    for (const item of source) {
      if (!seen.has(item)) {
        result.push(item);
        seen.add(item);
      }
    }

    for (const item of other) {
      if (!seen.has(item)) {
        result.push(item);
        seen.add(item);
      }
    }

    return result;
  };
