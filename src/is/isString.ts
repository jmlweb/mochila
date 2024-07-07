/**
 * Determines if a value is a string.
 *
 * @category Guard
 * @category String
 *
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a string or not.
 *
 * @example
 * ```
 * isString('abc'); // => true
 * isString(123); // => false
 * ```
 */
export const isString = (x: unknown): x is string => typeof x === 'string';
