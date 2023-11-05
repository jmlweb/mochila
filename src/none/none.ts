import { complement } from '../complement';
import { some } from '../some';

/**
 * Returns true if none of the elements in the array satisfy the predicate function.
 *
 * @param fn - The predicate function.
 * @returns A function that takes an array of elements of type A and returns true if none of the elements satisfy the predicate function.
 */
export const none =
  <A>(fn: (value: A) => boolean) =>
  <S extends ReadonlyArray<A>>(source: S) =>
    complement(some(fn))(source);
