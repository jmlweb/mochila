import { UnknownRecord } from '../types';
import { isObject } from './isObject';

/**
 * Determines if a value is a plain object.
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a plain object.
 *
 * @example
 * isPlainObject(1) // false;
 * isPlainObject(new Date()) // false;
 * isPlainObject({}); // true
 */
export const isPlainObject = <T>(x: T): x is Extract<T, UnknownRecord> =>
  isObject(x) && x.constructor === Object;
