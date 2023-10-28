import { IntoChunks, ProtectIfNonEmptyArray } from '../types';

export const intoChunks =
  <N extends number>(chunksNumber: N) =>
  <S extends ReadonlyArray<unknown>>(source: S) => {
    const safeChunksNumber = Math.max(1, chunksNumber);
    const chunks: ProtectIfNonEmptyArray<S>[] = Array.from(
      {
        length: safeChunksNumber,
      },
      () => [],
    );
    for (let i = 0; i < source.length; i++) {
      chunks[i % safeChunksNumber]?.push(source[i]);
    }
    return chunks as IntoChunks<N, S>;
  };
