/**
 * Returns true if at least one element in the array satisfies the provided testing function.
 * @template A The type of the elements in the array.
 * @param {function} fn A function to test for each element, taking an argument of the element and returning a boolean.
 * @returns {function} A function that takes an array of type S and returns a boolean.
 */
export const some =
  <A>(fn: (value: A) => boolean) =>
  <S extends ReadonlyArray<A>>(source: S) =>
    source.some(fn);
