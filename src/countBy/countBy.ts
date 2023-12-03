import { toString } from '../toString';
import { Stringifiable, ToString } from '../types';

/**
 * Counts the occurrences of each value in an array.
 *
 * - The values are converted to strings before being counted.
 * - The result is an object whose keys are the values and whose values are the number of occurrences.
 *
 * @category Array
 *
 * @example
 * ```
 * const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const isEven = (x: number) => x % 2 === 0;
 * const b = countBy(isEven)(a);
 * console.log(b); // { 'false': 5, 'true': 4 }
 * ```
 *
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
