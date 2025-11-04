/**
 * Performs binary search on a sorted array.
 * Returns the index of the element if found, or a negative index indicating where it should be inserted.
 *
 * @category Array
 * @example
 * ```
 * binarySearch((x: number) => x - 5)([1, 3, 5, 7, 9]);
 * // => 2 (index of 5)
 *
 * binarySearch((x: number) => x - 4)([1, 3, 5, 7, 9]);
 * // => -3 (should be inserted at index 2)
 * ```
 * @param compare - Comparison function returning 0 for match, negative if target is less, positive if greater
 * @param array - Sorted array to search
 * @returns Index of element if found, or negative index of insertion point - 1
 * @typeParam T - Element type
 */
export const binarySearch =
  <T extends readonly unknown[]>(compare: (element: unknown) => number) =>
  (array: T): number => {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const cmp = compare(array[mid]);

      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return -(left + 1);
  };
