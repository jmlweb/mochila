/**
 * Determines if a value is a boolean.
 *
 * @category Guard
 * @category Boolean
 *
 * @typeParam T - The type of the value to check.
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a boolean or not.
 *
 * @example
 * ```
 * isBoolean(true); // => true
 * isBoolean(false); // => true
 * isBoolean('abc'); // => false
 * ```
 */
export const isBoolean = <T>(x: T): x is Extract<T, boolean> =>
  typeof x === 'boolean';
