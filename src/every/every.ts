/**
 * Returns true if every element in the array satisfies the provided testing function.
 *
 * @template A The type of the elements in the array.
 * @param {function} fn The testing function.
 * @returns {function} A function that takes an array of type `A` and returns a boolean.
 */
export const every =
  <A>(fn: (value: A) => boolean) =>
  <S extends ReadonlyArray<A>>(source: S) =>
    source.every(fn);
