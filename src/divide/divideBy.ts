/**
 * Curried function that takes two numbers and returns the second divided by the first.
 *
 * @category Number
 *
 * @example
 * ```
 * const a = divideBy(4)(2); // 0.5
 * const b = divideBy(2)(4); // 2
 * ```
 */
export const divideBy = (b: number) => (a: number) => a / b;
