import { SubTypeOr } from '../types';

export const mapObject =
  <K extends string, From, To>(transformation: (v: From, key: K) => To) =>
  <Input extends Record<K, From>>(obj: Input) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        key,
        transformation(val as From, key as K),
      ]),
    ) as SubTypeOr<Input, Record<keyof Input, To>>;
