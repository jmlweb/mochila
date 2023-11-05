import { Chunkify } from '../types';

/**
 * Returns an array of arrays, where each subarray contains a maximum of `chunkSize` elements from the input `source` array.
 * If `chunkSize` is less than or equal to 0, the entire `source` array is returned as a single chunk.
 * @template N - The size of each chunk.
 * @param {N} chunkSize - The maximum number of elements in each chunk.
 * @returns {function} A function that receives an array and returns an array of arrays, where each subarray contains a maximum of `chunkSize` elements from the input `source` array.
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
