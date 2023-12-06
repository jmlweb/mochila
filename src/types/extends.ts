/**
 * Check if `A` is assignable to `B`
 *
 * @category Type Helper
 */
export type IfExtends<A, B, T = true, F = false> = A extends B ? T : F;

/**
 * If `Cond` is `true`, return `Then`, otherwise return `Else`
 *
 * @category Type Helper
 */
export type IfElse<Cond extends boolean, Then, Else> = IfExtends<
  Cond,
  false,
  Else,
  Then
>;

/**
 * Return `A` if `A` is assignable to `B`, otherwise return `B`
 *
 * @category Type Helper
 */
export type SubTypeOr<A, B> = IfExtends<A, B, A, B>;

/**
 * Check if `T` is a union type
 *
 * @category Type Helper
 */
export type IsUnion<T, C = T> = T extends C
  ? [C] extends [T]
    ? false
    : true
  : never;

/**
 * Check if `O` is a Wide type (`W` extends from it)
 *
 * @category Type Helper
 */
export type IsWide<W, O> = IfExtends<W, O>;
