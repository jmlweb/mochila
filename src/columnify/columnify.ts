import { Columnify, ProtectIfNonEmptyArray } from '../types';

/**
 * Takes an array and returns an array of arrays with a length of `columnsNumber`.
 *
 * - If `columns` number is greater than the length of the input array, the resulting arrays will be empty.
 * - If `columnsNumber` is less than 1, it will be set to 1.
 * - The resulting arrays contain the elements of the original array, distributed in a columnar fashion.
 *
 * @category Array
 *
 * @example
 * ```
 * const a = [1, 2, 3, 4, 5, 6];
 * const b = columnify(2)(a);
 * console.log(b); // [[1, 3, 5], [2, 4, 6]]
 * ```
 */
export const columnify =
  <N extends number>(columnsNumber: N) =>
  <S extends unknown[]>(source: S) => {
    const safeChunksNumber = Math.max(1, columnsNumber);
    const chunks: ProtectIfNonEmptyArray<S>[] = Array.from(
      {
        length: safeChunksNumber,
      },
      () => [],
    );
    for (let i = 0; i < source.length; i++) {
      chunks[i % safeChunksNumber]?.push(source[i]);
    }
    return chunks as Columnify<N, S>;
  };
