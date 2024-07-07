/**
 * Determines if a value is a RegExp.
 *
 * @category Guard
 * @category String
 *
 * @param x - The value to check.
 * @returns A boolean indicating whether the value is a RegExp.
 *
 * @example
 * ```
 * isRegExp(/abc/); // true
 * isRegExp(new RegExp('abc')); // true
 * isRegExp('abc'); // false
 * ```
 */

import { filter } from '../filter';

export const isRegExp = (x: unknown): x is RegExp => x instanceof RegExp;

const filterByRegExp = filter(isRegExp);
