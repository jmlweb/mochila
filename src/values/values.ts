/**
 * Returns an array of the values of a given object.
 * @template V The type of the object values.
 * @param {Record<PropertyKey, V>} source The object to extract the values from.
 * @returns {ReadonlyArray<V>} An array of the object values.
 */
export const values = <V>(source: Record<PropertyKey, V>) =>
  Object.values(source) as ReadonlyArray<V>;
