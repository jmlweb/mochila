/**
 * Curried function that takes two numbers and returns the remainder of the division of the first by the second.
 *
 * Uses true mathematical modulo operation, ensuring the result is always non-negative when the divisor is positive.
 *
 * @category Number
 *
 * @example
 * ```
 * modulo(5)(2) // 1
 * modulo(2)(5) // 2
 * modulo(-4)(2) // 0
 * modulo(4)(-2) // 0
 * ```
 */
export const modulo = (a: number) => (b: number) => {
  const result = ((a % b) + b) % b;
  return result === 0 ? 0 : result;
};
