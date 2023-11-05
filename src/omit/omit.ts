import { UnknownRecord } from '../types';

/**
 * Returns a new object with the specified keys omitted.
 *
 * @template K - The union of keys to omit from the object.
 * @param {K} keys - An array of keys to omit from the object.
 * @returns A function that accepts an object and returns a new object with the specified keys omitted.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: '2', c: true };
 * const result = omit(['a', 'c'])(obj);
 * // result: { b: '2' }
 * ```
 */
export const omit =
  <K extends keyof UnknownRecord>(keys: K[]) =>
  <O extends Record<K, unknown>>(obj: O) => {
    const result = {
      ...obj,
    } as Omit<O, K>;
    for (const key of keys) {
      if (key in result) {
        delete result[key as unknown as Exclude<keyof O, K>];
      }
    }
    return result;
  };
