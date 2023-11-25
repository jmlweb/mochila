import { At } from '../types';

export const lastItem = <V, S extends ReadonlyArray<V>>(source: S) =>
  source[source.length - 1] as At<-1, S>;
