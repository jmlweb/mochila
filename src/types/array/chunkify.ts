import { And, Complement, Or } from '../boolean';
import { IfElse, IsExtending } from '../extends';
import { ChunksFrom, IsNonEmptyArray } from './arrayHelpers';

type ProcessChunks<
  N extends number,
  S extends ReadonlyArray<unknown>,
  Acc extends ChunksFrom<S> = [],
> = S extends readonly [infer First, ...infer Rest]
  ? Acc extends [
      ...infer FilledGroups extends ReadonlyArray<Acc[number]>,
      infer LastGroup extends Acc[number],
    ]
    ? N extends LastGroup['length']
      ? ProcessChunks<N, Rest, [...FilledGroups, LastGroup, readonly [First]]>
      : ProcessChunks<
          N,
          Rest,
          [...FilledGroups, readonly [...LastGroup, First]]
        >
    : ProcessChunks<N, Rest, [readonly [First]]>
  : Readonly<Acc>;

export type Chunkify<
  N extends number,
  S extends ReadonlyArray<unknown>,
> = IfElse<
  Or<
    Complement<IsNonEmptyArray<S>>,
    And<IsExtending<S['length'], N>, IsExtending<0, N>>
  >,
  ChunksFrom<S>,
  ProcessChunks<N, S>
>;
