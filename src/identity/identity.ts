/**
 * Returns the value passed in, preserving its type.
 *
 * @category Function
 *
 * @typeParam T - The type of the value to return.
 * @param x - The value to return.
 * @returns The value passed in.
 *
 * @example
 * ```
 * identity(1) // => 1
 * identity('a') // => 'a'
 * identity(true) // => true
 * ```
 */
export const identity = <T>(x: T) => x;
