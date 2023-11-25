/**
 * Returns the minimum item from the given array.
 * If the array is empty, returns undefined.
 * If the array contains numbers, returns the minimum number.
 * If the array contains strings, returns the string with the minimum lexicographical order.
 *
 * @param source - The array from which to find the minimum item.
 * @returns The minimum item from the array, or undefined if the array is empty.
 */
export const minItem = (
  source: ReadonlyArray<number> | ReadonlyArray<string>,
) => {
  if (source.length === 0) {
    return undefined;
  }
  const min = source[0];
  if (!source.every((item) => typeof item === typeof min)) {
    throw new Error('All items must be of the same type');
  }
  if (typeof min === 'number') {
    return Math.min(...(source as ReadonlyArray<number>));
  }
  return (source as ReadonlyArray<string>).reduce((acc, curr) =>
    acc.localeCompare(curr) > 0 ? curr : acc,
  );
};
