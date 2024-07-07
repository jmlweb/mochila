import { UnknownRecord } from '../types';
import { isObject } from './isObject';

/**
 * Determines if a value is a plain object.
 *
 * @category Guard
 * @category Object
 * @see {@link isObject}
 *
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a plain object.
 *
 * @example
 * ```
 * isPlainObject(new Date()) // false;
 * isPlainObject({}); // true
 * isPlainObject({ a: 1 }); // true
 * ```
 */
export const isPlainObject = (x: unknown): x is UnknownRecord =>
  isObject(x) && x.constructor === Object;
