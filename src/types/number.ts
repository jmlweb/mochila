import { Complement } from './boolean';
import { IfExtends } from './extends';

export type IsNegative<N extends number> = N extends unknown
  ? IfExtends<`${N}`, `-${number}`>
  : never;

export type IsPositive<N extends number> = Complement<IsNegative<N>>;

export type IsLessThan1<N extends number> = N extends unknown
  ? IfExtends<N, 0, true, IsNegative<N>>
  : never;

export type Absolute<N extends number> = N extends unknown
  ? `${N}` extends `-${infer V extends number}`
    ? V
    : N
  : never;

export type IsWideNumber<N extends number> = IfExtends<number, N>;
