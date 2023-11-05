/**
 * Returns the result of subtracting b from a.
 * @param b The subtrahend number.
 * @returns A function that takes a minuend number and returns the difference.
 */
export const subtractBy = (b: number) => (a: number) => a - b;
