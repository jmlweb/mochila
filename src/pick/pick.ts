import { UnknownRecord } from '../types';

/**
 * Creates a new object by picking specific properties from an existing object.
 *
 * @category Object
 *
 * @example
 * ```
 * pick(['a', 'b'])({ a: 1, b: 2, c: 3 }) // { a: 1, b: 2 }
 * ```
 */
export const pick =
  <K extends keyof UnknownRecord>(keys: K[]) =>
  <O extends Record<K, unknown>>(obj: O) => {
    const result = {} as Pick<O, K>;
    for (const key of keys) {
      result[key] = obj[key];
    }
    return result;
  };
