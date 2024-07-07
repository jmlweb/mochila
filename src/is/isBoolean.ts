/**
 * Determines if a value is a boolean.
 *
 * @category Guard
 * @category Boolean
 *
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
export const isBoolean = (x: unknown): x is boolean => typeof x === 'boolean';
