import { reverse } from '../reverse';

/**
 * Finds the last element in the source array that satisfies the provided predicate function.
 *
 * Returns `undefined` if no element satisfies the predicate.
 *
 * @category Array
 *
 * @example
 * ```
 * const findLastPositive = findLast((x: number) => x > 0);
 * const a = findLastPositive([1, 2, 3]); // 3
 * const b = findLastPositive([-1, 0, -2]); // undefined
 * ```
 */
export const findLast =
  <Item>(predicate: (item: Item) => boolean) =>
  (source: ReadonlyArray<Item>): Item | undefined =>
    reverse(source).find(predicate);
