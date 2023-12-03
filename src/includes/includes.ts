/**
 * Checks if a value is included in a source array or string.
 *
 * @category Array
 *
 * @example
 * ```
 * includes(1)([1, 2, 3]); // => true
 * includes(1)([2, 3]); // => false
 * includes({})({}); // => false, because they hold different references
 * ```
 */
export const includes =
  <V>(value: V) =>
  (source: V extends string ? V | ReadonlyArray<V> : ReadonlyArray<V>) =>
    source.includes(value);
