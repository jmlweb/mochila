/**
 * Returns the index of the first element in the array that satisfies the provided testing function.
 */
export const findIndex =
  <Item>(predicate: (item: Item) => boolean) =>
  (source: ReadonlyArray<Item>) =>
    source.findIndex(predicate);
