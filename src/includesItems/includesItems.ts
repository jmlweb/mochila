/**
 * Checks if all items in the searched array are included in the source array.
 *
 * @category Array
 *
 * @example
 * ```
 * includesItems([1, 2])([1, 2, 3]); // => true
 * includesItems([1, 2])([2, 3]); // => false
 * includesItems([{}])([{}]); // => false, because they hold different references
 * ```
 */
export const includesItems =
  (searched: ReadonlyArray<unknown>) => (source: ReadonlyArray<unknown>) =>
    searched.every((item) => source.includes(item));
