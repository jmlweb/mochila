import { IsWideBoolean } from '../boolean';
import { IsWideNumber } from '../number';
import { IsWideString } from '../string';
import { IsNonEmptyArray, ProtectIfNonEmptyArray } from './arrayHelpers';

/**
 * Represents a type that can be filtered.
 * It can be either a string, number, boolean, null, or undefined.
 *
 * @category Array
 */
export type Filterable = string | number | boolean | null | undefined;

/**
 * Checks if a type is a wide filterable.
 *
 * @category Array
 */
export type IsWideFilterable<R extends Filterable> =
  IsWideBoolean<R extends boolean ? R : never> extends false
    ? IsWideString<R extends string ? R : never> extends false
      ? IsWideNumber<R extends number ? R : never> extends false
        ? false
        : true
      : true
    : true;

/**
 * Processes the values of `S` that are assignable to `V`.
 *
 * @category Array
 */
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

/**
 * Returns an array of values from `S` that are assignable to `V`.
 *
 * @category Array
 */
export type FilterValues<
  V extends Filterable,
  S extends ReadonlyArray<unknown>,
> =
  IsWideFilterable<V> extends true
    ? ProtectIfNonEmptyArray<S, S[number]>
    : IsNonEmptyArray<S> extends true
      ? ProcessFilterValues<V, S>
      : ProtectIfNonEmptyArray<S, Exclude<S[number], V>>;
