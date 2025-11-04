import { Or } from '../boolean';
import { IfExtends } from '../extends';
import { IsLessThan1, IsWideNumber } from '../number';
import { ChunksFrom, IsNonEmptyArray } from './arrayHelpers';
import { BiReadonlyArray } from './types';

type FillWithChunks<
  N extends number,
  S extends ReadonlyArray<ReadonlyArray<unknown>>,
  V extends ReadonlyArray<unknown> = readonly [],
> = S['length'] extends N ? S : FillWithChunks<N, readonly [...S, V], V>;

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

type ProcessColumnify<
  N extends number,
  S extends ReadonlyArray<unknown>,
  Acc extends BiReadonlyArray<unknown> = FillWithChunks<N, readonly []>,
  Counter extends ReadonlyArray<unknown> = [],
> = Counter['length'] extends N
  ? ProcessColumnify<N, S, Acc, []>
  : S extends [infer Head, ...infer Tail]
    ? ProcessColumnify<
        N,
        Tail,
        InjectIntoPosition<Counter['length'], Acc, Head>,
        [...Counter, never]
      >
    : Readonly<Acc>;

/**
 * Converts a tuple type into a tuple of tuples, where each tuple is a column of
 * the original tuple.
 *
 * @category Array
 *
 * @example
 * ```ts
 * type T0 = Columnify<2, [1, 2, 3, 4, 5, 6]>;
 * //	^ = type T0 = [[1, 3, 5], [2, 4, 6]]
 * ```
 */
export type Columnify<N extends number, S extends ReadonlyArray<unknown>> =
  Or<IfExtends<N, 1>, IsLessThan1<N>> extends true
    ? readonly [S]
    : IsWideNumber<N> extends true
      ? ChunksFrom<S>
      : S['length'] extends 0
        ? FillWithChunks<N, readonly []>
        : IsNonEmptyArray<S> extends true
          ? ProcessColumnify<N, S>
          : FillWithChunks<N, readonly [], ReadonlyArray<S[number]>>;
