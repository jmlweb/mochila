/**
 * Returns true if at least one element in the array satisfies the provided testing function.
 *
 * @category Array
 *
 * @example
 * ```
 * const source = [1, 2, 3];
 * const fn = (value: number) => value > 2;
 * some(fn)(source) // true
 * ```
 */
export const some =
  <A>(fn: (value: A) => boolean) =>
  <S extends ReadonlyArray<A>>(source: S) =>
    source.some(fn);
