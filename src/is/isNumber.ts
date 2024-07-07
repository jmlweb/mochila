/**
 * Determines if a value is a number.
 *
 * @category Guard
 * @category Number
 *
 * @typeParam T - The type of the value to check.
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a number or not.
 *
 * @example
 * ```
 * isNumber(1); // => true
 * isNumber('abc'); // => false
 * ```
 */
export const isNumber = (x: unknown): x is number => typeof x === 'number';
