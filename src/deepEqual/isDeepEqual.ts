import { makeIsDeepEqual } from './makeIsDeepEqual';

/**
 * Compares two items by value and returns true if they are deeply equal.
 *
 * Rules:
 * - Optimized for React components.
 * - Strict null comparison.
 * - No maximum depth.
 *
 * @category Guard
 * @see {@link makeIsDeepEqual}
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
 * isDeepEqual(null)(null); // true
 * isDeepEqual(null)(undefined); // false
 * isDeepEqual(undefined)(undefined); // true
 * isDeepEqual(
 *  { props: { children: 'Hello', $$typeof: Symbol, _owner: 'xxx' } }
 * )(
 *  { props: { children: 'Hello', $$typeof: Symbol, _owner: 'yyy' } }
 * ); // true
 * ```
 */

export const isDeepEqual = makeIsDeepEqual();
