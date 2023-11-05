/**
 * Returns a function that checks if all the elements in the `searched` array are included in the `source` array.
 * @param searched - The array of elements to search for.
 * @returns A function that takes an array and returns a boolean indicating if all the elements in `searched` are included in it.
 */
export const includesItems =
  (searched: ReadonlyArray<unknown>) => (source: ReadonlyArray<unknown>) =>
    searched.every((item) => source.includes(item));
