import { reverse } from '../reverse';

/**
 * Finds the last element in the source array that satisfies the provided predicate function.
 */
export const findLast =
  <Item>(predicate: (item: Item) => boolean) =>
  (source: ReadonlyArray<Item>): Item | undefined =>
    reverse(source).find(predicate);
