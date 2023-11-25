type AreEqualItems<S extends ReadonlyArray<unknown>> = S['length'] extends 0
  ? true
  : boolean;

/**
 * Determines if all items in the given array are equal.
 *
 * @example
 * areEqualItems([1, 1, 1]) // true
 * areEqualItems([1, 2, 3]) // false
 */
export const areEqualItems = <S extends ReadonlyArray<unknown>>(
  source: S,
): AreEqualItems<S> => (new Set(source).size === 1) as AreEqualItems<S>;
