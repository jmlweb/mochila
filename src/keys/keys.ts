import { Stringifiable, ToString, UnknownRecord } from '../types';

/**
 * Returns an array of string keys from an object.
 * @template O - The object type.
 * @param {O} o - The object to extract keys from.
 * @returns An array of string keys.
 */
export const keys = <O extends UnknownRecord>(o: O) =>
  Object.keys(o) as ToString<Extract<keyof O, Stringifiable>>[];
