/**
 * Returns the result of subtracting b from a.
 * @param a - The minuend number.
 * @returns A function that takes a subtrahend number and returns the difference.
 */
export const subtract = (a: number) => (b: number) => a - b;
