import { Compact } from '../types';

/**
 * Removes all nullable values from an array.
 * @template S - The type of the input array.
 * @param {S} source The array to compact.
 * @returns A new array with nullable values removed.
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
