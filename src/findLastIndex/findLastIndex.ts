import { reverse } from '../reverse';

/**
 * Returns the index of the last element in the array that satisfies the provided testing function.
 */
export const findLastIndex =
  <Item>(predicate: (item: Item) => boolean) =>
  (source: ReadonlyArray<Item>) => {
    const position = reverse(source).findIndex(predicate);
    return position === -1 ? position : source.length - 1 - position;
  };
