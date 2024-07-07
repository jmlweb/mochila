import { makeIsDeepEqual } from './makeIsDeepEqual';

/**
 * Compares two items by value and returns true if they are deeply equal.
 *
 * @category Guard
 *
 * @example
 * ```
 * isDeepEqual(1)(1); // true
 * isDeepEqual(1)(2); // false
 * isDeepEqual([1, 2, 3])([1, 2, 3]); // true
 * isDeepEqual([1, 2, 3])([1, 2, 4]); // false
 * isDeepEqual({ a: 1, b: [1, 2] })({ a: 1, b: [1, 2] }); // true
 * isDeepEqual({ a: 1, b: [1, 2] })({ a: 1, b: [1, 3] }); // false
 * isDeepEqual(new Date('2021-01-01'))(new Date('2021-01-01')); // true
 * isDeepEqual(new Date('2021-01-01'))(new Date('2021-01-02')); // false
 * isDeepEqual(/a/g)(/a/g); // true
 * isDeepEqual(/a/g)(/b/g); // false
 * ```
 */

export const isDeepEqual = makeIsDeepEqual();
