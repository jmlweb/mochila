import { Constant } from '../types';

/**
 * Returns a function that always returns the provided value.
 * @template V The type of the value.
 * @param {V} value The value to be returned by the constant function.
 * @returns {function} A function that always returns the provided value.
 */
export const constant =
  <V>(value: V): Constant<V> =>
  () =>
    value;
