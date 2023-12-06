import { And, Complement, Or } from '../boolean';
import { IfElse, IfExtends } from '../extends';
import { Absolute, IsNegative } from '../number';
import { IsNonEmptyArray, ProtectIfNonEmptyArray } from './arrayHelpers';

type ProcessPositive<
  N extends number,
  S extends ReadonlyArray<unknown>,
  Acc extends ReadonlyArray<unknown> = [],
  Counter extends never[] = [],
> = S extends readonly [infer First, ...infer Tail]
  ? N extends unknown
    ? N extends Counter['length']
      ? ProcessPositive<N, Tail, Acc, [...Counter, never]>
      : ProcessPositive<N, Tail, Readonly<[...Acc, First]>, [...Counter, never]>
    : never
  : Readonly<Acc>;

type ProcessNegative<
  N extends number,
  S extends ReadonlyArray<unknown>,
  Acc extends ReadonlyArray<unknown> = [],
> = S extends readonly [infer First, ...infer Tail]
  ? N extends unknown
    ? Absolute<N> extends S['length']
      ? ProcessNegative<N, Tail, Acc>
      : ProcessNegative<N, Tail, Readonly<[...Acc, First]>>
    : never
  : Readonly<Acc>;

/**
 * Removes the element at index `N` from `S`.
 *
 * @category Array
 */
export type DeleteAt<
  N extends number,
  S extends ReadonlyArray<unknown>,
> = IfElse<
  Or<
    Complement<IsNonEmptyArray<S>>,
    And<IfExtends<S['length'], N>, IfExtends<0, N>>
  >,
  ProtectIfNonEmptyArray<S>,
  N extends unknown
    ? IfElse<IsNegative<N>, ProcessNegative<N, S>, ProcessPositive<N, S>>
    : never
>;
