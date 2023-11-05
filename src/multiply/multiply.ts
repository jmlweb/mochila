/**
 * Returns a function that multiplies a number by a given factor.
 * @param a - The number to be multiplied.
 * @returns A function that takes a number and multiplies it by `a`.
 */
export const multiply = (a: number) => (b: number) => a * b;
