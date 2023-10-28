import { IfElse } from '../helpers';
import { IsLessThan1 } from '../number';
import { ChunksFrom, IsNonEmptyArray } from './arrayHelpers';
import { BiReadonlyArray } from './types';

type ChunksOf<
  N extends number,
  V,
  Acc extends BiReadonlyArray<V> = [],
> = Acc['length'] extends N
  ? Acc
  : ChunksOf<N, V, readonly [...Acc, ReadonlyArray<V>]>;

type InjectIntoPosition<
  P extends number,
  S extends BiReadonlyArray<unknown>,
  V,
  Acc extends BiReadonlyArray<unknown> = [],
> = Acc['length'] extends S['length']
  ? Acc
  : P extends Acc['length']
  ? InjectIntoPosition<
      P,
      S,
      V,
      [
        ...Acc,
        S[P][number] extends never ? readonly [V] : readonly [...S[P], V],
      ]
    >
  : InjectIntoPosition<P, S, V, readonly [...Acc, S[Acc['length']]]>;

type ProcessChunks<
  N extends number,
  S extends ReadonlyArray<unknown>,
  Acc extends BiReadonlyArray<unknown> = ChunksOf<N, never>,
  Counter extends ReadonlyArray<unknown> = [],
> = S extends readonly [infer Head, ...infer Tail]
  ? Counter['length'] extends N
    ? ProcessChunks<N, S, Acc, []>
    : ProcessChunks<
        N,
        Tail,
        InjectIntoPosition<Counter['length'], Acc, Head>,
        [...Counter, never]
      >
  : Readonly<Acc>;

type SafeIntoChunks<
  N extends number,
  S extends ReadonlyArray<unknown>,
> = IfElse<IsNonEmptyArray<S>, ProcessChunks<N, S>, ChunksOf<N, S[number]>>;

export type IntoChunks<
  N extends number,
  S extends ReadonlyArray<unknown>,
> = IsLessThan1<N> extends true
  ? SafeIntoChunks<1, S>
  : 0 extends N
  ? ChunksFrom<S>
  : SafeIntoChunks<N, S>;
