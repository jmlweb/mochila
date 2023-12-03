import { Constant } from '../types';

/**
 * Returns a function that always returns the provided value.
 *
 * @category Function
 *
 * @typeParam V - The type of the value.
 * @param value - The value to be returned by the constant function.
 * @returns A function that always returns the provided value.
 *
 * @example
 * ```
 * const alwaysOne = constant(1);
 * console.log(alwaysOne()); // 1
 * ```
 */
export const constant =
  <V>(value: V): Constant<V> =>
  () =>
    value;
