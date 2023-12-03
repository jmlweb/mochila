/**
 * Ensures that the returned value is an array.
 *
 * If the given value is an array, it is returned as-is. Otherwise, the given value is wrapped in an array.
 *
 * @category Array
 *
 * @example
 * ```
 * castArray(1); // [1]
 * castArray([1]); // [1]
 * ```
 */
export const castArray = <T>(x: T | T[]) => (Array.isArray(x) ? x : [x]);
