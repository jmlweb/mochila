import { DeleteAt } from '../types';

export const deleteAt =
  <P extends number>(position: P) =>
  <S extends ReadonlyArray<unknown>>(source: S) => {
    const parsedPosition = position < 0 ? source.length + position : position;
    return [
      ...source.slice(0, parsedPosition),
      ...source.slice(parsedPosition + 1),
    ] as DeleteAt<P, S>;
  };
