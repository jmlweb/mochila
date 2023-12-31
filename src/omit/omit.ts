import { IsWide, Or, UnknownRecord } from '../types';

/**
 * Returns a new object with the specified keys omitted.
 *
 * @category Object
 *
 * @example
 * ```
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
    } as Or<IsWide<string, K>, IsWide<number, K>> extends true
      ? Partial<O>
      : Omit<O, K>;
    for (const key of keys) {
      if (key in result) {
        delete result[key as unknown as Exclude<keyof O, K>];
      }
    }
    return result;
  };
