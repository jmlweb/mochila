/**
 * Determines if a value is not null or undefined.
 * @param x - The value to check.
 * @returns A boolean indicating if the value is not null or undefined.
 */
export const isNonNullable = <T>(x: T): x is NonNullable<T> => x != null;
