import { IsWide } from './extends';

/**
 * Represents a type that can be converted to a string.
 * It can be either a string, number, or boolean.
 */
export type Stringifiable = string | number | boolean;

/**
 * Converts a value to a string, trying to preserve the narrow type.
 */
export type ToString<T extends Stringifiable> = T extends string
  ? T
  : `${T}` & string;

/**
 * Checks if a string type is a wide string.
 */
export type IsWideString<S extends string> = IsWide<string, S>;
