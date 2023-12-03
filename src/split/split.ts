/**
 * Splits a string into an array of substrings based on a specified separator.
 *
 * @category String
 *
 * @example
 * ```
 * const source = 'Hello, world!';
 * const separator = ',';
 * split(separator)(source) // ['Hello', ' world!']
 * ```
 */
export const split = (separator: string | RegExp) => (str: string) =>
  str.split(separator);
