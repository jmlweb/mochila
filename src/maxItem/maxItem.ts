/**
 * Returns the maximum item from the given array.
 * If the array is empty, returns undefined.
 * If the array contains numbers, returns the maximum number.
 * If the array contains strings, returns the string with the highest lexicographical order.
 *
 * @param source - The array from which to find the maximum item.
 * @returns The maximum item from the array, or undefined if the array is empty.
 */
export const maxItem = (
  source: ReadonlyArray<number> | ReadonlyArray<string>,
) => {
  if (source.length === 0) {
    return undefined;
  }
  const max = source[0];
  if (typeof max === 'number') {
    return Math.max(...(source as ReadonlyArray<number>));
  }
  if (!source.every((item) => typeof item === typeof max)) {
    throw new Error('All items must be of the same type');
  }
  return (source as ReadonlyArray<string>).reduce((acc, curr) =>
    acc.localeCompare(curr) > 0 ? acc : curr,
  );
};
