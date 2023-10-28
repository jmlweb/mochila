import { clone } from '../clone';
import { NonReadonly, ProtectIfNonEmptyArray } from '../types';

export const sortWith =
  <V>(sortFn?: (a: V, b: V) => number) =>
  <S extends ReadonlyArray<V>>(source: S) =>
    (clone(source) as NonReadonly<S>).sort(sortFn) as ProtectIfNonEmptyArray<S>;
