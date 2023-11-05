type AreEqualItems<S extends ReadonlyArray<unknown>> = S['length'] extends 0
  ? true
  : boolean;

/**
 * Determines if all items in the given array are equal.
 * @template S The type of the input array.
 * @param {S} source The input array to check.
 * @returns {AreEqualItems<S>} A boolean indicating if all items in the array are equal.
 */
export const areEqualItems = <S extends ReadonlyArray<unknown>>(
  source: S,
): AreEqualItems<S> => (new Set(source).size === 1) as AreEqualItems<S>;
