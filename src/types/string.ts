import { IsWide } from './extends';

/**
 * Represents a type that can be converted to a string.
 * It can be either a string, number, or boolean.
 *
 * @category String
 */
export type Stringifiable = string | number | boolean;

/**
 * Converts a value to a string, trying to preserve the narrow type.
 *
 * @category String
 */
export type ToString<T extends Stringifiable> = T extends string
  ? T
  : `${T}` & string;

/**
 * Checks if a string type is a wide string.
 *
 * @category String
 */
export type IsWideString<S> = IsWide<string, S>;
