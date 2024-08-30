import { clone } from '../clone';
import { isArray, isPlainObject } from '../is';

interface DeepClone {
  <T>(value: T): T;
  <T>(value: T[]): T[];
}

/**
 * Returns a deep copy of the provided value in the following way:
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
 * @returns A deep copy of the provided value.
 *
 * @example
 * ```
 * const a = { value: [1, 2, 3] };
 * const b = clone(a);
 * b.value[0] = 4;
 * console.log(a); // { value: [1, 2, 3] }
 * console.log(b); // { value: [4, 2, 3] }
 * ```
 */
export const deepClone: DeepClone = (value) => {
  if (isArray(value)) {
    return value.map(deepClone);
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [key, deepClone(value)]),
    );
  }
  return clone(value);
};
