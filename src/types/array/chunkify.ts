import { type And, type Complement, type Or } from '../boolean';
import { type IfElse, type IfExtends } from '../extends';
import { type ChunksFrom, type IsNonEmptyArray } from './arrayHelpers';

type ProcessChunks<
  N extends number,
  S extends readonly unknown[],
  Acc extends ChunksFrom<S> = [],
> = S extends readonly [infer First, ...infer Rest]
  ? Acc extends [
      ...infer FilledGroups extends readonly Acc[number][],
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

/**
 * Returns an array of chunks of length `N` from `S`.
 *
 * @category Array
 */
export type Chunkify<N extends number, S extends readonly unknown[]> = IfElse<
  Or<
    Complement<IsNonEmptyArray<S>>,
    And<IfExtends<S['length'], N>, IfExtends<0, N>>
  >,
  ChunksFrom<S>,
  ProcessChunks<N, S>
>;
