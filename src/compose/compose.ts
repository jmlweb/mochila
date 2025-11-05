/**
 * Composes functions right-to-left.
 * Inverse of pipe - functions are applied from right to left.
 *
 * @category Function
 * @example
 * ```
 * const add = (x: number) => x + 1;
 * const multiply = (x: number) => x * 2;
 * compose(add, multiply)(5);
 * // => 11 (multiply(5) = 10, then add(10) = 11)
 * ```
 * @param fns - Functions to compose
 * @returns Composed function
 * @typeParam T - Input and output type
 */
export const compose = <T>(...fns: Array<(x: T) => T>): ((x: T) => T) => {
  return (value: T): T => {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
};
