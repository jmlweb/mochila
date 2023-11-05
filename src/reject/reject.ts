/**
 * Returns a new array with all the elements that do not satisfy the provided testing function.
 *
 * @param {function} fn - The testing function.
 * @returns A function that takes an array of type V and returns a new array of type V.
 */
export const reject =
  <V>(fn: (x: V) => boolean) =>
  (source: ReadonlyArray<V>) =>
    source.filter((x) => !fn(x));
