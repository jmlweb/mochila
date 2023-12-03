/**
 * Curried function that takes two numbers and returns the remainder of the division of the second by the first one.
 *
 * @category Number
 *
 * @example
 * ```
 * modulo(5)(2) // 2
 * modulo(2)(5) // 1
 * modulo(-1)(2) // 0
 * modulo(2)(-4) // -0
 * ```
 */
export const moduloBy = (a: number) => (b: number) => b % a;
