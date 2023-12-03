/**
 * Finds the index of the first element in the source array that satisfies the provided predicate function.
 *
 * Returns `-1` if no element satisfies the predicate.
 *
 * @category Array
 *
 * @example
 * ```
 * const findPositiveIndex = findIndex((x: number) => x > 0);
 * const a = findPositiveIndex([1, 2, 3]); // 0
 * const b = findPositiveIndex([-1, 0, -2]); // -1
 * ```
 */
export const findIndex =
  <Item>(predicate: (item: Item) => boolean) =>
  (source: ReadonlyArray<Item>) =>
    source.findIndex(predicate);
