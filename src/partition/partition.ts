import { ProtectIfNonEmptyArray } from '../types';

/**
 * Partitions an array into two arrays based on a given predicate function.
 *
 * @category Array
 *
 * @example
 * ```
 * const isEven = (n: number) => n % 2 === 0;
 * const numbers = [1, 2, 3, 4, 5];
 * const [evens, odds] = partition(isEven)(numbers);
 * // evens: number[] = [2, 4]
 * // odds: number[] = [1, 3, 5]
 * ```
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
