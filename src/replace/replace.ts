/**
 * Replaces occurrences of a search value with a replace value in a string.
 *
 * @category String
 *
 * @example
 * ```
 * const source = 'Hello, world!';
 * const searchValue = 'world';
 * const replaceValue = 'John';
 * replace(searchValue, replaceValue)(source) // 'Hello, John!'
 * ```
 */
export const replace =
  (searchValue: string | RegExp, replaceValue: string) =>
  (str: string): string =>
    str.replace(searchValue, replaceValue);
