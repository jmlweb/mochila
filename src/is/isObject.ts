/**
 * Determines if a value is an object.
 *
 * @category Guard
 * @category Object
 *
 * @param x - The value to check.
 * @returns True if the value is an object, false otherwise.
 *
 * @example
 * ```
 * isObject(1); // false
 * isObject(new Date()) // true;
 * isObject({}) // true;
 * ```
 */
export const isObject = (x: unknown): x is object =>
  typeof x === 'object' && x !== null;
