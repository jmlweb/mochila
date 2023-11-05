interface Filter {
  <T, V>(
    fn: (x: V) => x is Extract<V, T>,
  ): (source: ReadonlyArray<V>) => Extract<V, T>[];
  <V>(fn: (x: V) => boolean): <T extends V>(source: ReadonlyArray<V>) => T[];
}

/**
 * Filters an array of values based on a given predicate function.
 * @template V The type of the values in the input array.
 * @param {(x: V) => boolean} fn The predicate function used to filter the input array.
 * @returns {function} A function that takes an array of values of type V and returns an array of values of type T that satisfy the predicate function.
 */
export const filter: Filter =
  <V>(fn: (x: V) => boolean) =>
  <T extends V>(source: ReadonlyArray<T>) =>
    source.filter(fn) as T[];
