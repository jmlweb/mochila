import { IfExtends } from './extends';

/**
 * Represents the complement of a boolean type.
 *
 * @typeParam B - The boolean type to complement.
 *
 * @category Boolean
 */
export type Complement<B extends boolean> = IfExtends<B, false, true, false>;

/**
 * Type alias that represents the logical OR operation between two boolean types.
 *
 * @typeParam A - The first boolean type.
 * @typeParam B - The second boolean type.
 *
 * @category Boolean
 */
export type Or<A extends boolean, B extends boolean> = IfExtends<true, A | B>;

/**
 * Type-level logical AND operation.
 *
 * @typeParam A - The first boolean type.
 * @typeParam B - The second boolean type.
 *
 * @category Boolean
 */
export type And<A extends boolean, B extends boolean> = IfExtends<
  false,
  A | B,
  false,
  true
>;

/**
 * Determines if the given type `B` is a wide boolean.
 * A wide boolean is a boolean type that can be either `true` or `false`.
 *
 * @typeParam B - The boolean type to check.
 *
 * @category Boolean
 */
export type IsWideBoolean<B extends boolean> = boolean extends B ? true : false;
