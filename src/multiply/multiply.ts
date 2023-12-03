/**
 * Curried function that multiplies two numbers.
 *
 * @category Number
 *
 * @example
 * ```
 * multiply(2)(3) // 6
 * ```
 */
export const multiply = (a: number) => (b: number) => a * b;
