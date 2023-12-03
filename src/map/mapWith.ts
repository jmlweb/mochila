import { NonEmptyArray } from '../types';

/**
 * Applies a transformation function over each element of an array and returns a new array with the transformed elements.
 *
 * Because the array is supplied in first place, the type of the argument of the transformation function is inferred.
 *
 * @category Array
 *
 * @example
 * ```
 * mapWith([1, 2, 3])((x) => x * 2); // [2, 4, 6]
 * ```
 */
export const mapWith =
  <From, Source extends ReadonlyArray<From>>(source: Source) =>
  <To>(transformation: (x: Source[number]) => To) =>
    source.map(transformation) as Source extends NonEmptyArray<Source[number]>
      ? {
          [Index in keyof Source]: To;
        }
      : To[];
