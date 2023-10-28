import { Stringifiable, ToString, UnknownRecord } from '../types';

export const keys = <O extends UnknownRecord>(o: O) =>
  Object.keys(o) as ToString<Extract<keyof O, Stringifiable>>[];
