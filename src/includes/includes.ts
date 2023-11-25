/**
 * Checks if a value is included in a source array or string.
 *
 */
export const includes =
  <V>(value: V) =>
  (source: V extends string ? V | ReadonlyArray<V> : ReadonlyArray<V>) =>
    source.includes(value);
