import { isArray, isDate, isFunction, isPlainObject, isRegExp } from '../is';

/**
 * Returns a non-deep copy of the provided value in the following way:
 *
 * - If the provided value is an array, a shallow copy of the array is returned.
 * - If the provided value is an object, a shallow copy of the object is returned.
 * - If the provided value is a function, a function that returns the same value is returned.
 * - Otherwise, the provided value is returned as-is.
 *
 * @category Array
 * @category Object
 * @category Function
 *
 * @typeParam T - The type of the value to be cloned.
 * @param value - The value to be cloned.
 * @returns A non-deep copy of the provided value.
 *
 * @example
 * ```
 * const a = [1, 2, 3];
 * const b = clone(a);
 * b[0] = 4;
 * console.log(a); // [1, 2, 3]
 * console.log(b); // [4, 2, 3]
 * ```
 */
export const clone = <T>(value: T): T => {
  if (isArray(value)) {
    return [...value] as T;
  }
  if (isDate(value)) {
    return new Date(value) as T;
  }
  if (isRegExp(value)) {
    return new RegExp(value) as T;
  }
  if (isPlainObject(value)) {
    return { ...value };
  }
  if (isFunction(value)) {
    return ((...args: Parameters<typeof value>): ReturnType<typeof value> =>
      value(...args)) as typeof value;
  }
  return value;
};
