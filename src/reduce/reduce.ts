/**
 * Applies a reducer function to each element of the array, resulting in a single value.
 *
 * @category Array
 *
 * @example
 * ```
 * reduce(0, (acc: number, curr:) => acc + curr)([1, 2, 3]) // 6
 * ```
 */
export const reduce =
  <V, T>(starter: V, reducer: (acc: V, curr: T) => V) =>
  (source: ReadonlyArray<T>): V =>
    source.reduce(reducer, starter);
