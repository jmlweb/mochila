/**
 * Checks if every element in an array passes a given predicate.
 *
 * @category Array
 *
 * @example
 * ```
 * const areAllPositive = every((x: number) => x > 0);
 * const a = areAllPositive([1, 2, 3]); // true
 * const b = areAllPositive([-1, 0, 1]); // false
 * ```
 *
 */
export const every =
  <A>(fn: (value: A) => boolean) =>
  <S extends ReadonlyArray<A>>(source: S) =>
    source.every(fn);
