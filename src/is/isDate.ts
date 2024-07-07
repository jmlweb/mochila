/**
 * Determines if a value is a Date object.
 *
 * @category Guard
 * @category Date
 *
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a Date object.
 *
 * @example
 * ```
 * isDate(new Date()); // => true
 * isDate({}); // => false
 * ```
 */
export const isDate = (x: unknown): x is Date => x instanceof Date;
