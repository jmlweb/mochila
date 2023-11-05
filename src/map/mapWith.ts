import { NonEmptyArray } from '../types';

/**
 * Applies a transformation function to each element of an array and returns a new array with the transformed elements.
 * @template From The type of the elements in the input array.
 * @template Source The type of the input array.
 * @template To The type of the elements in the output array.
 * @param {Source} source The input array.
 * @param {(function} transformation The transformation function to apply to each element.
 * @returns The output array with the transformed elements.
 */
export const mapWith =
  <From, Source extends ReadonlyArray<From>>(source: Source) =>
  <To>(transformation: (x: Source[number]) => To) =>
    source.map(transformation) as Source extends NonEmptyArray<Source[number]>
      ? {
          [Index in keyof Source]: To;
        }
      : To[];
