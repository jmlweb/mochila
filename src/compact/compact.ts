import { Compact } from '../types';

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
