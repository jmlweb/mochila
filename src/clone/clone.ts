import { isArray, isFunction, isPlainObject } from '../is';

/**
 * Returns a non-deep copy of the provided value.
 *
 * @template T The type of the value to be cloned.
 * @param {T} value - The value to be cloned.
 * @returns {T} A non-deep copy of the provided value.
 */
export const clone = <T>(value: T): T => {
  if (isArray(value)) {
    return [...value] as T;
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
