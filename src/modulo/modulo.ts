/**
 * Curried function that takes two numbers and returns the remainder of the division of the first by the second.
 *
 * @category Number
 *
 * @example
 * ```
 * modulo(5)(2) // 1
 * modulo(2)(5) // 2
 * modulo(2)(-1) // 0
 * modulo(-4)(2) // -0
 * ```
 */
export const modulo = (a: number) => (b: number) => a % b;
