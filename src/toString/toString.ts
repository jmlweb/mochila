import { Stringifiable, ToString } from '../types';

/**
 * Returns a string representation of the input value trying to respect the string typing
 *
 * @category String
 *
 * @typeParam T - The type of the value to be converted to a string.
 * @param x - The value to be converted to a string.
 * @returns A string representation of the input value.
 *
 * @example
 * ```
 * toString(1) // '1'
 * ```
 */
export const toString = <T extends Stringifiable>(x: T) =>
  `${x}` as ToString<T>;

/**
 * Returns a string representation of the input value returning a wide string as type.
 *
 * @category String
 *
 * @param x - The value to be converted to a string.
 * @returns A string representation of the input value.
 */
export const toStringW = (x: unknown) => `${x}`;
