import { clone } from '../clone';
import { Reverse } from '../types';

export const reverse = <T, V extends ReadonlyArray<T>>(value: V): Reverse<V> =>
  (clone(value) as unknown as T[]).reverse() as unknown as Reverse<V>;
