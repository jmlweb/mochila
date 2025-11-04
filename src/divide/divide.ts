/**
 * Curried function that takes two numbers and returns the first divided by the second.
 *
 * @category Number
 *
 * @example
 * ```
 * const a = divide(4)(2); // 2
 * const b = divide(2)(4); // 0.5
 * ```
 */
export const divide = (a: number) => (b: number) => a / b;
