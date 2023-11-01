import { Filterable, FilterValues } from '../types';

export const filterValues =
  <V extends Filterable>(values: ReadonlyArray<V>) =>
  <S extends ReadonlyArray<unknown>>(source: S) =>
    source.filter((value) => values.includes(value as V)) as FilterValues<V, S>;
