import { IsNonEmptyArray, ProtectIfNonEmptyArray } from './arrayHelpers';
import {
  Filterable,
  IsWideFilterable,
  ProcessFilterValues,
} from './filterValues';

export type RejectValues<
  V extends Filterable,
  S extends ReadonlyArray<unknown>,
> = IsWideFilterable<V> extends true
  ? ProtectIfNonEmptyArray<S, S[number]>
  : IsNonEmptyArray<S> extends true
  ? ProcessFilterValues<V, S, [], 'omit'>
  : ProtectIfNonEmptyArray<S, Exclude<S[number], V>>;
