import { IsNonEmptyArray, ProtectIfNonEmptyArray } from './arrayHelpers';
import {
  Filterable,
  IsWideFilterable,
  ProcessFilterValues,
} from './filterValues';

export type RejectValues<
  V,
  S extends ReadonlyArray<unknown>,
> = V extends Filterable
  ? IsWideFilterable<V> extends true
    ? ProtectIfNonEmptyArray<S, S[number]>
    : IsNonEmptyArray<S> extends true
    ? ProcessFilterValues<V, S, [], 'omit'>
    : ProtectIfNonEmptyArray<S, Exclude<S[number], V>>
  : ProtectIfNonEmptyArray<S, S[number]>;
