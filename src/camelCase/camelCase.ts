/**
 * Converts a string to camelCase.
 * Handles various separators: spaces, hyphens, underscores, and transitions between cases.
 *
 * @category String
 * @example
 * ```
 * camelCase('hello-world');
 * // => 'helloWorld'
 *
 * camelCase('hello_world_test');
 * // => 'helloWorldTest'
 * ```
 * @param str - String to convert
 * @returns camelCased string
 */
export const camelCase = (str: string): string => {
  // Convert to lowercase first, then handle word boundaries
  return str
    .toLowerCase()
    .replace(/[_\s-]+(.)/g, (_, char) => char.toUpperCase());
};
