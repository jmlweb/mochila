import { Chunkify } from '../types';

/**
 * Returns an array of arrays, where each subarray contains a maximum of `chunkSize` elements from the input `source` array.
 *
 * If `chunkSize` is less than or equal to 0, the entire `source` array is returned as a single chunk.
 *
 * @category Array
 *
 * @see {@link Chunkify}
 *
 * @example
 * ```
 * const a = [1, 2, 3, 4, 5, 6, 7, 8];
 * const b = chunkify(3)(a);
 * console.log(b); // [[1, 2, 3], [4, 5, 6], [7, 8]]
 * ```
 */
export const chunkify =
  <N extends number>(chunkSize: N) =>
  <S extends ReadonlyArray<unknown>>(source: S): Chunkify<N, S> => {
    const parsedChunkSize = chunkSize <= 0 ? source.length : chunkSize;
    const chunks: S[number][][] = [];
    for (let i = 0; i < source.length; i += parsedChunkSize) {
      chunks.push(source.slice(i, i + parsedChunkSize));
    }
    return chunks as unknown as Chunkify<N, S>;
  };
