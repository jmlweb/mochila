import { clone } from '../clone';
import { NonReadonly, ProtectIfNonEmptyArray } from '../types';

export const sort =
  <S extends ReadonlyArray<unknown>>(source: S) =>
  (sortFn?: (a: S[number], b: S[number]) => number) =>
    (clone(source) as NonReadonly<S>).sort(sortFn) as ProtectIfNonEmptyArray<S>;
