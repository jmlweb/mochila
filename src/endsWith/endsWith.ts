import { at } from '../at';
import { isString } from '../is';
import { slice } from '../slice';

/**
 * Checks if a value is the end of a source array or string.
 *
 * @param search - The value to search for.
 * @param endIndex - Search starts at endIndex – length.
 *
 * @category Array
 * @category String
 *
 * @example
 * ```
 * endsWith('c')('abc'); // => true
 * endsWith('b')('abc'); // => false
 * endsWith('c')(['a', 'b', 'c']); // => true
 * endsWith('b')(['a', 'b', 'c']); // => false
 * endsWith('a', 1)('abc'); // => true
 * endsWith('a', 2)('abc'); // => false
 * endsWith('a', 1)(['a', 'b', 'c']); // => true
 * endsWith('a', 2)(['a', 'b', 'c']); // => false
 * ```
 */

export const endsWith =
  <V>(search: V, endIndex?: number) =>
  (
    source: V extends string
      ? V | ReadonlyArray<unknown>
      : ReadonlyArray<unknown>,
  ) => {
    if (isString(source)) {
      return isString(search) && source.endsWith(search, endIndex);
    }
    // Make array work like endsWith for strings, including the endIndex parameter
    return at(-1)(endIndex ? slice(0, endIndex)(source) : source) === search;
  };
