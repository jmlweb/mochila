/**
 * Returns a function that divides a number by a given divisor.
 * @param {number} a The dividend.
 * @returns {function} A function that takes a divisor and returns the result of dividing the dividend by the divisor.
 */
export const divide = (a: number) => (b: number) => a / b;
