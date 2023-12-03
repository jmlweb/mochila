import { Stringifiable, ToString, UnknownRecord } from '../types';

/**
 * Returns an array of string keys from an object.
 *
 * @category Object
 *
 * @param o - The object to extract keys from.
 * @returns An array of string keys.
 *
 * @example
 * ```
 * const a = keys({ a: 1, b: 2, c: 3 }); // => ['a', 'b', 'c']
 * a.push('d'); // OK
 * ```
 */
export const keysW = (o: UnknownRecord) => Object.keys(o);

/**
 * Returns an array of string keys from an object, trying to preserve the type of the keys.
 *
 * @category Object
 *
 * @typeParam O - The object type.
 * @param o - The object to extract keys from.
 * @returns An array of string keys.
 *
 * @example
 * ```
 * const a = keys({ a: 1, b: 2, c: 3 }); // => ['a', 'b', 'c']
 * a.push('d'); // Error => '"d"' is not assignable to '"a" | "b" | "c"'.
 * ```
 */
export const keys = <O extends UnknownRecord>(o: O) =>
  Object.keys(o) as ToString<Extract<keyof O, Stringifiable>>[];
