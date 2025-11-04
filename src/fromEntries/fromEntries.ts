/**
 * Converts an array of [key, value] pairs to an object.
 * Curried wrapper around Object.fromEntries for composition.
 *
 * @category Object
 * @example
 * ```
 * fromEntries([['a', 1], ['b', 2], ['c', 3]]);
 * // => { a: 1, b: 2, c: 3 }
 * ```
 * @param entries - Array of [key, value] pairs
 * @returns Object created from entries
 * @typeParam T - Value type
 */
export const fromEntries = <T = unknown>(
  entries: ReadonlyArray<readonly [string, T]>,
): Record<string, T> => {
  return Object.fromEntries(entries) as Record<string, T>;
};
