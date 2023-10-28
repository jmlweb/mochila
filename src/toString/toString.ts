import { Stringifiable, ToString } from '../types';

export const toString = <T extends Stringifiable>(x: T) =>
  `${x}` as ToString<T>;
