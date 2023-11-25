import { IsNonEmptyArray } from './arrayHelpers';

type FlattenValue<T> = T extends Array<infer U> ? FlattenValue<U> : T;

type ProcessFlatten<S extends ReadonlyArray<unknown>> = S extends readonly [
  infer Head,
  ...infer Tail,
]
  ? Head extends ReadonlyArray<unknown>
    ? readonly [...ProcessFlatten<Head>, ...ProcessFlatten<Tail>]
    : readonly [Head, ...ProcessFlatten<Tail>]
  : S;

export type Flatten<S extends ReadonlyArray<unknown>> =
  IsNonEmptyArray<S> extends true ? ProcessFlatten<S> : FlattenValue<S>[];
