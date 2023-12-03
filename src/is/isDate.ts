/**
 * Determines if a value is a Date object.
 *
 * @category Guard
 * @category Date
 *
 * @typeParam T - The type of the value to check.
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a Date object.
 *
 * @example
 * ```
 * isDate(new Date()); // => true
 * isDate({}); // => false
 * ```
 */
export const isDate = <T>(x: T): x is Extract<T, Date> => x instanceof Date;
