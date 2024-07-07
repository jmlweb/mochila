/**
 * Determines if a value is null or undefined.
 *
 * @category Guard
 *
 * @param x - The value to check.
 * @returns True if the value is null or undefined, false otherwise.
 *
 * @example
 * ```
 * isNullable(1); // => false
 * isNullable(null); // => true
 * isNullable(undefined); // => true
 * ```
 */
export const isNullable = (x: unknown): x is null | undefined => x == null;
