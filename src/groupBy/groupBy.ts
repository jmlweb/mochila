import { toString } from '../toString';
import { ProtectIfNonEmptyArray, Stringifiable, ToString } from '../types';

/**
 * Groups an array of items by a key returned by a mapping function.
 * @template From The type of the items in the input array.
 * @template To The type of the key returned by the mapping function.
 * @param {(x: From) => To} fn A function that maps an item to a key.
 * @returns A function that takes an array of items and returns an object whose keys are the result of applying the mapping function to each item, and whose values are arrays of items that share the same key.
 */
export const groupBy =
  <From, To extends Stringifiable>(fn: (item: From) => To) =>
  <S extends ReadonlyArray<From>>(source: S) => {
    const result = {} as Record<ToString<To>, ProtectIfNonEmptyArray<S>>;
    for (const item of source) {
      const key = toString(fn(item));
      result[key] = [...(result[key] || []), item];
    }
    return result;
  };
