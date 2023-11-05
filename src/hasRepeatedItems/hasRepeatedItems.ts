/**
 * Determines if an array has repeated items.
 * @param source The array to check for repeated items.
 * @returns True if the array has repeated items, false otherwise.
 */
export const hasRepeatedItems = (source: ReadonlyArray<unknown>) =>
  new Set(source).size !== source.length;
