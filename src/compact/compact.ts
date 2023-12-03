import { Compact } from '../types';

/**
 * Removes all nullable values from an array.
 *
 * @category Array
 *
 * @typeParam S - The type of the input array.
 * @param source - The array to compact.
 * @returns A new array with nullable values removed.
 *
 * @example
 * ```
 * const a = [1, null, 2, undefined, 3, 4, 5, null, 6];
 * const b = compact(a);
 * console.log(b); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export const compact = <S extends ReadonlyArray<unknown>>(
  source: S,
): Compact<S> => {
  const result = [];
  for (const item of source) {
    if (item != null) {
      result.push(item);
    }
  }
  return result as Compact<S>;
};
