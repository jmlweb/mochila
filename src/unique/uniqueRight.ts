import { pipe } from '../pipe';
import { reverse } from '../reverse';
import { unique } from './unique';

/**
 * Returns a new array with all duplicate values removed starting from the end of the input array.
 *
 * @category Array
 *
 * @typeParam V - The type of the elements in the source array.
 * @param source - The input array to remove duplicates from.
 * @returns A new array with all duplicate values removed starting from the end of the input array.
 *
 * @example
 * ```
 * uniqueRight([1, 2, 3, 2, 1]); // [3, 2, 1]
 * ```
 */
export const uniqueRight = pipe(
  <V>(source: ReadonlyArray<V>) => reverse(source),
  unique,
  reverse,
);
