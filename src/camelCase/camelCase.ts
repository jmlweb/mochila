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
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase(),
    )
    .replace(/[\s_-]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''));
};
