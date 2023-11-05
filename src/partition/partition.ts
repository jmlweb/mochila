import { ProtectIfNonEmptyArray } from '../types';

/**
 * Partitions an array into two arrays based on a given predicate function.
 * @template T The type of the items in the array.
 * @param {(arg: T) => boolean} fn The predicate function used to partition the array.
 * @returns A function that takes an array of type T and returns a tuple of two arrays, one containing the items that satisfy the predicate and the other containing the items that do not.
 */
export const partition =
  <T>(fn: (arg: T) => boolean) =>
  <A extends ReadonlyArray<T>>(arr: A) => {
    const left: T[] = [];
    const right: T[] = [];
    for (const item of arr) {
      if (fn(item)) {
        left.push(item);
      } else {
        right.push(item);
      }
    }
    return [left, right] as readonly [
      ProtectIfNonEmptyArray<A>,
      ProtectIfNonEmptyArray<A>,
    ];
  };
