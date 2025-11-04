/**
 * Removes leading and trailing whitespace from a string.
 * Curried wrapper around String.prototype.trim for composition.
 *
 * @category String
 * @example
 * ```
 * trim('  hello world  ');
 * // => 'hello world'
 * ```
 * @param str - String to trim
 * @returns Trimmed string
 */
export const trim = (str: string): string => {
  return str.trim();
};
