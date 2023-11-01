export type IfExtends<A, B, T = true, F = false> = A extends B ? T : F;

export type IfElse<Cond extends boolean, Then, Else> = IfExtends<
  Cond,
  false,
  Else,
  Then
>;

export type SubTypeOr<A, B> = IfExtends<A, B, A, B>;

export type IsUnion<T, C = T> = T extends C
  ? [C] extends [T]
    ? false
    : true
  : never;

export type IsWide<W, O> = IfExtends<W, O>;
