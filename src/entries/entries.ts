/**
 * Converts an object to an array of [key, value] pairs.
 * Curried wrapper around Object.entries for composition.
 *
 * @category Object
 * @example
 * ```
 * entries({ a: 1, b: 2, c: 3 });
 * // => [['a', 1], ['b', 2], ['c', 3]]
 * ```
 * @param obj - Object to convert
 * @returns Array of [key, value] pairs
 * @typeParam T - Object value type
 */
export const entries = <T extends Record<string, unknown>>(
  obj: T,
): Array<[string, unknown]> => {
  return Object.entries(obj);
};
