/**
 * Represents an array of arrays of the given type.
 *
 * @category Array
 */
export type BiReadonlyArray<T> = readonly (readonly T[])[];

/**
 * A readonly array containing at least one element
 *
 * @category Array
 */
export type NonEmptyArray<T> = readonly [T, ...T[]];

/**
 * A readonly array containing at least two elements
 *
 * @category Array
 */
export type Tupleable<T> = readonly [T, T, ...T[]];
