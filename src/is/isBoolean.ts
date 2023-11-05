/**
 * Determines if a value is a boolean.
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a boolean or not.
 */
export const isBoolean = <T>(x: T): x is Extract<T, boolean> =>
  typeof x === 'boolean';
