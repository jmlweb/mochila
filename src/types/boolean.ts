import { IfExtends } from './extends';

export type Complement<B extends boolean> = IfExtends<B, false, true, false>;

export type Or<A extends boolean, B extends boolean> = IfExtends<true, A | B>;

export type And<A extends boolean, B extends boolean> = IfExtends<
  false,
  A | B,
  false,
  true
>;

export type IsWideBoolean<B extends boolean> = boolean extends B ? true : false;
