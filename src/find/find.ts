/**
 * Finds the first element in the source array that satisfies the provided predicate function.
 */
export const find =
  <Item>(predicate: (item: Item) => boolean) =>
  (source: ReadonlyArray<Item>) =>
    source.find(predicate);
