/**
 * Determines if a value is a Date object.
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a Date object.
 */
export const isDate = <T>(x: T): x is Extract<T, Date> => x instanceof Date;
