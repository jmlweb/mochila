import { UnknownRecord } from '../types';

export const pick =
  <K extends keyof UnknownRecord>(keys: K[]) =>
  <O extends Record<K, unknown>>(obj: O) => {
    const result = {} as Pick<O, K>;
    for (const key of keys) {
      result[key] = obj[key];
    }
    return result;
  };
