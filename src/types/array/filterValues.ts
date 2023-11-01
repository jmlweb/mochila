import { IsWideBoolean } from '../boolean';
import { IsWideNumber } from '../number';
import { IsWideString } from '../string';
import { IsNonEmptyArray, ProtectIfNonEmptyArray } from './arrayHelpers';

export type Filterable = string | number | boolean | null | undefined;

export type IsWideFilterable<R extends Filterable> = IsWideBoolean<
  R extends boolean ? R : never
> extends false
  ? IsWideString<R extends string ? R : never> extends false
    ? IsWideNumber<R extends number ? R : never> extends false
      ? false
      : true
    : true
  : true;

export type ProcessFilterValues<
  V extends Filterable,
  S extends ReadonlyArray<unknown>,
  Acc extends ReadonlyArray<unknown> = [],
  Mode extends 'pick' | 'omit' = 'pick',
> = S extends readonly [infer Head, ...infer Rest]
  ? Head extends V
    ? Mode extends 'pick'
      ? ProcessFilterValues<V, Rest, readonly [...Acc, Head], Mode>
      : ProcessFilterValues<V, Rest, Acc, Mode>
    : Mode extends 'pick'
    ? ProcessFilterValues<V, Rest, Acc, Mode>
    : ProcessFilterValues<V, Rest, readonly [...Acc, Head], Mode>
  : Readonly<Acc>;

export type FilterValues<
  V extends Filterable,
  S extends ReadonlyArray<unknown>,
> = IsWideFilterable<V> extends true
  ? ProtectIfNonEmptyArray<S, S[number]>
  : IsNonEmptyArray<S> extends true
  ? ProcessFilterValues<V, S>
  : ProtectIfNonEmptyArray<S, Exclude<S[number], V>>;
