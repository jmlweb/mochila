type HasEqualItems<S extends ReadonlyArray<unknown>> = S['length'] extends 0
  ? true
  : boolean;

/**
 * Determines if all items in the given array are equal.
 *
 * An empty array will return `true`.
 *
 * @category Array
 *
 * @example
 * ```
 * areEqualItems([1, 1, 1]) // true with boolean type
 * areEqualItems([1, 2, 3]) // false with boolean type
 * areEqualItems([]) // true with literal type
 * ```
 */
export const hasEqualItems = <S extends ReadonlyArray<unknown>>(
  source: S,
): HasEqualItems<S> => (new Set(source).size === 1) as HasEqualItems<S>;
