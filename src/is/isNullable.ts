/**
 * Determines if a value is null or undefined.
 * @param x - The value to check.
 * @returns True if the value is null or undefined, false otherwise.
 */
export const isNullable = (x: unknown): x is null | undefined => x == null;
