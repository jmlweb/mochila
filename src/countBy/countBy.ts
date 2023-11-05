import { toString } from '../toString';
import { Stringifiable, ToString } from '../types';

/**
 * Returns an object with the count of occurrences of each stringified value returned by the provided function.
 * @param {function} fn A function that maps each element in the input array to a stringifiable value.
 * @returns {function} A function that receives array of `From` and returns an object with the count of occurrences of each stringified value returned by the provided function.
 */
export const countBy =
  <From, To extends Stringifiable>(fn: (item: From) => To) =>
  (source: ReadonlyArray<From>) => {
    const result = {} as Record<ToString<To>, number>;
    for (const item of source) {
      const key = toString(fn(item));
      result[key] = (result[key] ?? 0) + 1;
    }
    return result;
  };
