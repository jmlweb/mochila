/**
 * Returns a function that divides a number by a given number.
 * @param {number} b The number to divide by.
 * @returns A function that takes a number and returns the result of dividing it by the given number.
 */
export const divideBy = (b: number) => (a: number) => a / b;
