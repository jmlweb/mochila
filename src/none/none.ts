import { complement } from '../complement';
import { some } from '../some';

/**
 * Returns true if none of the elements in the array satisfy the predicate function.
 *
 * @category Array
 *
 * @example
 * ```
 * none((x: number) => x > 2)([1, 2, 3]) // false
 * none((x: number) => x > 2)([1, 2]) // true
 * none((x: number) => x > 2)([]) // true
 * ```
 */
export const none =
  <A>(fn: (value: A) => boolean) =>
  <S extends ReadonlyArray<A>>(source: S) =>
    complement(some(fn))(source);
