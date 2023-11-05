/**
 * Determines if a value is an object.
 * @param x - The value to check.
 * @returns True if the value is an object, false otherwise.
 *
 * @example
 * isObject(1); // false
 * isObject(new Date()) // true;
 * isObject({}) // true;
 */
export const isObject = <T>(x: T): x is Extract<T, object> =>
  typeof x === 'object' && x !== null;
