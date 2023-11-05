/**
 * Returns the remainder of a number divided by another number.
 * @param b The divisor number.
 * @returns A function that takes a number and returns the remainder of that number divided by the divisor.
 */
export const moduloBy = (b: number) => (a: number) => a % b;
