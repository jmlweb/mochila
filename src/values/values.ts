/**
 * Returns an array of the values of a given object.
 *
 * @category Object
 *
 * @typeParam V - The type of the object values.
 * @param source - The object to extract the values from.
 * @returns An array of the object values.
 *
 * @example
 * ```
 * values({ a: 1, b: 2, c: 3 }) // [1, 2, 3]
 * ```
 */
export const values = <V>(source: Record<PropertyKey, V>) =>
  Object.values(source) as ReadonlyArray<V>;
