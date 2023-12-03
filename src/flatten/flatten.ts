import { Flatten } from '../types';

/**
 * Flattens a nested array into a single-dimensional array.
 *
 * @category Array
 * @see {@link Flatten}
 *
 * @typeParam S - The type of the source array.
 * @param source - The array to flatten.
 * @returns The flattened array.
 *
 * @example
 * const source = [1, [2, [3, [4, [5, 6]]]]] as const;
 * const result = flatten(source);
 * // result: [1, 2, 3, 4, 5, 6]
 */
export const flatten = <S extends ReadonlyArray<unknown>>(
  source: S,
): Flatten<S> =>
  source.reduce(
    (acc: S[number][], curr) => {
      if (Array.isArray(curr)) {
        acc.push(...flatten(curr));
      } else {
        acc.push(curr);
      }
      return acc;
    },
    [] as S[number][],
  ) as Flatten<S>;
