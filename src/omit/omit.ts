import { UnknownRecord } from '../types';

export const omit =
  <K extends keyof UnknownRecord>(keys: K[]) =>
  <O extends Record<K, unknown>>(obj: O) => {
    const result = {
      ...obj,
    } as Omit<O, K>;
    for (const key of keys) {
      if (key in result) {
        delete result[key as unknown as Exclude<keyof O, K>];
      }
    }
    return result;
  };
