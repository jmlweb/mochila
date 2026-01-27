import { type IsNonEmptyArray } from './arrayHelpers';

type FlattenValue<T> = T extends (infer U)[] ? FlattenValue<U> : T;

type ProcessFlatten<S extends readonly unknown[]> = S extends readonly [
  infer Head,
  ...infer Tail,
]
  ? Head extends readonly unknown[]
    ? readonly [...ProcessFlatten<Head>, ...ProcessFlatten<Tail>]
    : readonly [Head, ...ProcessFlatten<Tail>]
  : S;

/**
 * Flattens a nested array type.
 *
 * @category Array
 */
export type Flatten<S extends readonly unknown[]> =
  IsNonEmptyArray<S> extends true ? ProcessFlatten<S> : FlattenValue<S>[];
