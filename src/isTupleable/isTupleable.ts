import { Tupleable } from '../types';

export const isTupleable = <T>(x: ReadonlyArray<T>): x is Tupleable<T> =>
  x.length > 1;
