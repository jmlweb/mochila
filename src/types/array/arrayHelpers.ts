import { BiReadonlyArray, NonEmptyArray, Tupleable } from './types';

/**
 * Determines if the given type is an array whose length is greater than zero.
 *
 * @typeParam S - The array type to check.
 *
 * @category Array
 */
export type IsNonEmptyArray<S extends ReadonlyArray<unknown>> =
  S extends NonEmptyArray<S[number]> ? true : false;

/**
 * Determines if the given type is an array that contains at least 2 elements.
 *
 * @typeParam S - The array type to check.
 *
 * @category Array
 */
export type IsTupleable<S extends ReadonlyArray<unknown>> = S extends Tupleable<
  S[number]
>
  ? true
  : false;

/**
 * Returns the reverse of the given array type.
 *
 * @typeParam T - The array type to reverse.
 *
 * @category Array
 */
export type Reverse<T extends ReadonlyArray<unknown>> = T extends readonly [
  infer Head,
  ...infer Rest,
]
  ? readonly [...Reverse<Rest>, Head]
  : T;

/**
 * @category Array
 */
export type ProtectIfNonEmptyArray<
  T extends ReadonlyArray<unknown>,
  V = T[number],
> = T extends readonly [x: unknown, ...rest: unknown[]]
  ? ReadonlyArray<V>
  : V[];

/**
 * Extracts the type of the items in the given array type and returns an array of arrays
 *
 * @category Array
 */
export type ChunksFrom<S extends ReadonlyArray<unknown>> = BiReadonlyArray<
  S[number]
>;

/**
 * @category Array
 */
export type ExtractItem<S extends ReadonlyArray<unknown>> =
  S[number] extends undefined
    ? undefined
    : S[number] extends infer V
    ? V | undefined
    : S[number] | undefined;
