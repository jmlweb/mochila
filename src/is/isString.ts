/**
 * Determines if a value is a string.
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a string or not.
 */
export const isString = <T>(x: T): x is Extract<T, string> =>
  typeof x === 'string';
