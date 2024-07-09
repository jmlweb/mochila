import { isString } from '../is';

/**
 * Checks if a value is included in a source array or string.
 *
 * @category Array
 * @category String
 *
 * @example
 * ```
 * includes(1)([1, 2, 3]); // => true
 * includes(1)([2, 3]); // => false
 * includes({})({}); // => false, because they hold different references
 * ```
 */
export const includes =
  <V>(search: V, startIndex?: number) =>
  (
    source: V extends string
      ? string | ReadonlyArray<unknown>
      : ReadonlyArray<unknown>,
  ) => {
    if (isString(source)) {
      return isString(search) && source.includes(search, startIndex);
    }
    return source.includes(search, startIndex);
  };
