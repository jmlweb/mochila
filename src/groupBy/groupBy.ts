import { toString } from '../toString';
import {
  type ProtectIfNonEmptyArray,
  type Stringifiable,
  type ToString,
} from '../types';

/**
 * Groups an array of items by a key returned by a mapping function.
 *
 * @category Array
 *
 * @example
 * ```
 * const getLength = (item: string) => item.length;
 * groupBy(getLength)(['a', 'bb', 'c', 'dd']); // => { '1': ['a', 'c'], '2': ['bb', 'dd'] }
 * ```
 */
export const groupBy =
  <From, To extends Stringifiable>(fn: (item: From) => To) =>
  <S extends readonly From[]>(source: S) => {
    const result = {} as Record<ToString<To>, ProtectIfNonEmptyArray<S>>;
    for (const item of source) {
      const key = toString(fn(item));
      result[key] = [...(result[key] || []), item];
    }
    return result;
  };
