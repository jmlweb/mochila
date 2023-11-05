/**
 * Returns a new array with unique values from the source array.
 * @template V - The type of the elements in the source array.
 * @param {ReadonlyArray<V>} source - The source array.
 * @returns {V[]} A new array with unique values.
 */
export const unique = <V>(source: ReadonlyArray<V>) =>
  Array.from(new Set(source));
