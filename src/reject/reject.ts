/**
 * Rejects all the elements of an array that satisfy the condition specified in a callback function.
 *
 * @category Array
 *
 * @example
 * ```
 * const source = [1, 2, 3];
 * const predicate = (x: number) => x % 2 === 0;
 * reject(predicate)(source) // [1, 3]
 * ```
 */
export const reject =
  <V>(fn: (x: V) => boolean) =>
  (source: ReadonlyArray<V>) =>
    source.filter((x) => !fn(x));
