/**
 * Determines if a value is a number.
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a number or not.
 */
export const isNumber = <T>(x: T): x is Extract<T, number> =>
  typeof x === 'number';
