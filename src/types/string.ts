import { IsWide } from './extends';

export type Stringifiable = string | number | boolean;

export type ToString<T extends Stringifiable> = T extends string
  ? T
  : `${T}` & string;

export type IsWideString<S extends string> = IsWide<string, S>;
