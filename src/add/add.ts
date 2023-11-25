/**
 * Curried function that adds two numbers.
 *
 * @example add(1)(2) // 3
 */
export const add = (a: number) => (b: number) => a + b;
