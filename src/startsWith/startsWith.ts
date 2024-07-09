import { at } from '../at';
import { isString } from '../is';
import { pipe } from '../pipe';
import { slice } from '../slice';

/**
 * Checks if a value is the start of a source array or string.
 *
 * @param search - The value to search for.
 * @param fromIndex - The index to start searching from.
 *
 * @category Array
 * @category String
 *
 * @example
 * ```
 * startsWith(1)([1, 2, 3]); // => true
 * startsWith(1)([2, 3, 1]); // => false
 * startsWith('a')('abc'); // => true
 * startsWith('a')(['a', 'b', 'c']); // => true
 * startsWith('b')(['a', 'b', 'c']); // => false
 * startsWith('b', 1)(['a', 'b', 'c']); // => false
 * ```
 */
export const startsWith =
  <V>(search: V, fromIndex?: number) =>
  (
    source: V extends string
      ? V | ReadonlyArray<unknown>
      : ReadonlyArray<unknown>,
  ) => {
    if (isString(source)) {
      return isString(search) && source.startsWith(search, fromIndex);
    }
    return pipe(slice(fromIndex), at(0))(source) === search;
  };
