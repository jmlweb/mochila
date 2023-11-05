import { UnknownRecord } from '../types';

/**
 * Returns a new object with only the specified keys from the input object.
 * @template K - The keys to pick from the input object.
 * @param {K[]} keys - The keys to pick from the input object.
 * @returns {function} A function that takes an object and returns a new object with only the specified keys from the input object.
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
