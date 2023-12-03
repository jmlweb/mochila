import { BiReadonlyArray, NonEmptyArray, Tupleable } from './types';

export type IsNonEmptyArray<S extends ReadonlyArray<unknown>> =
  S extends NonEmptyArray<S[number]> ? true : false;

export type IsTupleable<S extends ReadonlyArray<unknown>> = S extends Tupleable<
  S[number]
>
  ? true
  : false;

export type Reverse<T extends ReadonlyArray<unknown>> = T extends readonly [
  infer Head,
  ...infer Rest,
]
  ? readonly [...Reverse<Rest>, Head]
  : T;

export type ProtectIfNonEmptyArray<
  T extends ReadonlyArray<unknown>,
  V = T[number],
> = T extends readonly [x: unknown, ...rest: unknown[]]
  ? ReadonlyArray<V>
  : V[];

export type ChunksFrom<S extends ReadonlyArray<unknown>> = BiReadonlyArray<
  S[number]
>;

export type ExtractItem<S extends ReadonlyArray<unknown>> =
  S[number] extends undefined
    ? undefined
    : S[number] extends infer V
    ? V | undefined
    : S[number] | undefined;
