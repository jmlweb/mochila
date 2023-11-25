import { At } from '../types';

/**
 * Returns the element at the specified position in the source array.
 */
export const at =
  <P extends number>(position: P) =>
  <S extends ReadonlyArray<unknown>>(source: S): At<P, S> =>
    source.at(position) as At<P, S>;
