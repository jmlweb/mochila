/**
 * Returns elements that appear in both arrays.
 * Preserves uniqueness and order from the main array.
 *
 * @category Array
 * @example
 * ```
 * intersection([2, 3])([1, 2, 3, 4]);
 * // => [2, 3]
 * ```
 * @param other - Array to intersect with
 * @param source - Source array
 * @returns Array of common elements
 * @typeParam T - Element type
 */
export const intersection =
  <T>(other: ReadonlyArray<T>) =>
  (source: ReadonlyArray<T>): T[] => {
    const otherSet = new Set(other);
    const seen = new Set<T>();
    const result: T[] = [];

    for (const item of source) {
      if (otherSet.has(item) && !seen.has(item)) {
        result.push(item);
        seen.add(item);
      }
    }

    return result;
  };
