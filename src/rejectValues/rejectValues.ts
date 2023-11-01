import { Filterable, RejectValues } from '../types';

export const rejectValues =
  <V extends Filterable>(values: ReadonlyArray<V>) =>
  <S extends ReadonlyArray<unknown>>(source: S) =>
    source.filter((value) => !values.includes(value as V)) as RejectValues<
      V,
      S
    >;
