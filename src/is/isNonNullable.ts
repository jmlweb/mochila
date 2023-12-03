/**
 * Determines if a value is not null nor undefined.
 *
 * @category Guard
 *
 * @typeParam T - The type of the value to check.
 * @param x - The value to check.
 * @returns A boolean indicating if the value is not null or undefined.
 *
 * @example
 * ```
 * isNonNullable(1); // => true
 * isNonNullable(null); // => false
 * isNonNullable(undefined); // => false
 * ```
 */
export const isNonNullable = <T>(x: T): x is NonNullable<T> => x != null;
