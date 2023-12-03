/**
 * Applies a reducer function to each element of the array from right to left, accumulating a single result.
 *
 * @category Array
 *
 * @example
 * ```
 * const source = [1, 2, 3];
 * const reducer = (acc: number, curr: number) => curr / acc;
 * const starter = 1;
 * reduceRight(starter, reducer)(source) // 1.5
 * ```
 */
export const reduceRight =
  <V, T>(starter: V, reducer: (acc: V, curr: T) => V) =>
  (source: ReadonlyArray<T>): V =>
    source.reduceRight(reducer, starter);
