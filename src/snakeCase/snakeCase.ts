/**
 * Converts a string to snake_case.
 * Handles various separators and case transitions.
 *
 * @category String
 * @example
 * ```
 * snakeCase('helloWorld');
 * // => 'hello_world'
 *
 * snakeCase('HelloWorldTest');
 * // => 'hello_world_test'
 * ```
 * @param str - String to convert
 * @returns snake_cased string
 */
export const snakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s_-]+/g, '_')
    .toLowerCase();
};
