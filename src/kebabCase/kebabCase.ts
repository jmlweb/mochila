/**
 * Converts a string to kebab-case.
 * Handles various separators and case transitions.
 *
 * @category String
 * @example
 * ```
 * kebabCase('helloWorld');
 * // => 'hello-world'
 *
 * kebabCase('HelloWorldTest');
 * // => 'hello-world-test'
 * ```
 * @param str - String to convert
 * @returns kebab-cased string
 */
export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
};
