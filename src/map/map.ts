/**
 * Applies a transformation function to each element of an array and returns a new array with the transformed elements.
 *
 * Because the transformation function is supplied in first place, the type of the array is inferred. The argument of the transformation function must be specified.
 *
 * @category Array
 *
 * @example
 * ```
 * map((x: number) => x * 2)([1, 2, 3]); // [2, 4, 6]
 * ```
 */
export const map =
  <From, To>(transformation: (x: From) => To) =>
  (source: ReadonlyArray<From> | From[]) =>
    source.map(transformation);
