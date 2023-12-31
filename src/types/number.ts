import { Complement } from './boolean';
import { IfExtends } from './extends';

/**
 * Checks if a number includes the negative sign.
 *
 * @category Number
 */
export type IsNegative<N extends number> = N extends unknown
  ? IfExtends<`${N}`, `-${number}`>
  : never;

/**
 * Checks if a number is positive.
 *
 * Zero is considered positive.
 *
 * @category Number
 */
export type IsPositive<N extends number> = Complement<IsNegative<N>>;

/**
 * Checks if a number is zero or includes the negative sign.
 *
 * @category Number
 */
export type IsLessThan1<N extends number> = N extends unknown
  ? IfExtends<N, 0, true, IsNegative<N>>
  : never;

/**
 * Returns the absolute value of a number (removes the negative sign).
 *
 * @category Number
 */
export type Absolute<N extends number> = N extends unknown
  ? `${N}` extends `-${infer V extends number}`
    ? V
    : N
  : never;

/**
 * Checks if a number is a wide number.
 *
 * @category Number
 */
export type IsWideNumber<N extends number> = IfExtends<number, N>;
