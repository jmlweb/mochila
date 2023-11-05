import { Stringifiable, ToString } from '../types';

/**
 * Returns a string representation of the input value.
 * @template T - The type of the input value.
 * @param {T} x - The input value to convert to a string.
 * @returns {ToString<T>} - The string representation of the input value.
 */
export const toString = <T extends Stringifiable>(x: T) =>
  `${x}` as ToString<T>;

/**
 * Returns a string representation of the input value.
 * @param x - The value to be converted to a string.
 * @returns A string representation of the input value.
 */
export const toStringL = (x: unknown) => `${x}`;
