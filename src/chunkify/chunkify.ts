import { Chunkify } from '../types';

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
