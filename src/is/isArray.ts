/**
 * Determines if a value is an array.
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is an array.
 */
export const isArray = <T>(x: T): x is Extract<T, ReadonlyArray<unknown>> => {
  return Array.isArray(x);
};
