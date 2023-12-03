import { At } from '../types';

/**
 * Returns the last item of an array.
 *
 * @category Array
 *
 * @typeParam V - The item type.
 * @typeParam S - The source array type.
 * @param source - The array.
 * @returns The last item of the array. If the array is empty, `undefined` is returned.
 *
 * @example
 * ```
 * lastItem([1, 2, 3]); // 3
 * lastItem([]); // undefined
 * ```
 */
export const lastItem = <V, S extends ReadonlyArray<V>>(source: S) =>
  source[source.length - 1] as At<-1, S>;
