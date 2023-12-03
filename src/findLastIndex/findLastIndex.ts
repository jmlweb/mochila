import { reverse } from '../reverse';

/**
 * Finds the index of the last element in the source array that satisfies the provided predicate function.
 *
 * Returns `-1` if no element satisfies the predicate.
 *
 * @category Array
 *
 * @example
 * ```
 * const findLastPositiveIndex = findLastIndex((x: number) => x > 0);
 * const a = findLastPositiveIndex([1, 2, 3]); // 2
 * const b = findLastPositiveIndex([-1, 0, -2]); // -1
 * ```
 */
export const findLastIndex =
  <Item>(predicate: (item: Item) => boolean) =>
  (source: ReadonlyArray<Item>) => {
    const position = reverse(source).findIndex(predicate);
    return position === -1 ? position : source.length - 1 - position;
  };
