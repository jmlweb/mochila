/**
 * Returns a function that adds a number to the given value.
 * @param {number} a The number to add to.
 * @returns {function} A function that takes a number and returns the sum of a and that number.
 */
export const add = (a: number) => (b: number) => a + b;
