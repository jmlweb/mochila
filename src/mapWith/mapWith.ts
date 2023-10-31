import { NonEmptyArray } from '../types';

export const mapWith =
  <From, Source extends ReadonlyArray<From>>(source: Source) =>
  <To>(transformation: (x: Source[number]) => To) =>
    source.map(transformation) as Source extends NonEmptyArray<Source[number]>
      ? {
          [Index in keyof Source]: To;
        }
      : To[];
