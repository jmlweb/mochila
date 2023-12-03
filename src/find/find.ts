/**
 * Finds the first element in the source array that satisfies the provided predicate function.
 *
 * Returns `undefined` if no element satisfies the predicate.
 *
 * @category Array
 *
 * @example
 * ```
 * const findPositive = find((x: number) => x > 0);
 * const a = findPositive([1, 2, 3]); // 1
 * const b = findPositive([-1, 0, -2]); // undefined
 * ```
 */
export const find =
  <Item>(predicate: (item: Item) => boolean) =>
  (source: ReadonlyArray<Item>) =>
    source.find(predicate);
