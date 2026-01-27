type Filter = {
  <T>(fn: (x: unknown) => x is T): <U>(source: readonly U[]) => Extract<U, T>[];
  <V>(fn: (x: V) => boolean): <T extends V>(source: readonly V[]) => T[];
};

/**
 * Filters an array based on a predicate function.
 *
 * @category Array
 *
 * @example
 * ```
 * const takePositives = filter((x: number) => x > 0);
 * const a = takePositives([1, 2, 3]); // [1, 2, 3]
 * const b = takePositives([-1, 0, 1]); // [1]
 * ```
 */
export const filter: Filter =
  <V>(fn: (x: V) => boolean) =>
  <T extends V>(source: readonly T[]) =>
    source.filter(fn);
