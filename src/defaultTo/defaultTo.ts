import { isNullable } from '../is';

/**
 * A function that receives a defaultValue and returns a new function that receives a value.
 * If the value is null, or undefined, the defaultValue is returned, otherwise the value is returned.
 *
 * @category Logic
 */
export const defaultTo =
  <R>(defaultValue: R) =>
  <T>(value?: T) =>
    (isNullable(value) ? defaultValue : value) as T extends NonNullable<T>
      ? T
      : NonNullable<T> extends never
        ? R
        : T | R;
