import { type AnyFn } from '../types/function';

const TAG = '\u0000mochila';

/**
 * Memoizes a function, caching results based on arguments.
 * Works best with pure functions with small input spaces.
 *
 * The cache key is the JSON form of the arguments, so objects and arrays
 * match by content, not identity. `undefined`, `NaN`, `Infinity`,
 * `-Infinity` and BigInt values get their own keys. Functions and symbols
 * match by identity. `-0` and `0` share a key. Circular arguments throw a
 * `TypeError`; `Map` and `Set` arguments are not told apart by content.
 * A key that contains the literal `"\u0000mochila"` property can collide.
 *
 * @category Function
 * @example
 * ```
 * const expensiveSum = (a: number, b: number) => {
 *   console.log('computing...');
 *   return a + b;
 * };
 * const memoized = memoize(expensiveSum);
 * memoized(2, 3); // logs 'computing...'
 * memoized(2, 3); // returns cached result
 * ```
 * @param fn - Function to memoize
 * @returns Memoized function
 * @typeParam F - Function type
 */
export const memoize = <F extends AnyFn>(fn: F): F => {
  const cache = new Map<string, unknown>();
  // WeakMap for functions so memoize never keeps a caller's closure alive.
  const functionIds = new WeakMap<object, number>();
  const symbolIds = new Map<symbol, number>();
  let nextId = 0;

  const identityOf = <K extends object | symbol>(
    ids: {
      get: (key: K) => number | undefined;
      set: (key: K, id: number) => unknown;
    },
    value: K,
  ) => {
    const known = ids.get(value);
    if (known !== undefined) return known;
    nextId += 1;
    ids.set(value, nextId);
    return nextId;
  };

  // JSON.stringify turns these values into `null`, `{}`, or throws.
  const replacer = (_key: string, value: unknown): unknown => {
    switch (typeof value) {
      case 'undefined':
        return { [TAG]: 'undefined' };
      case 'number':
        return Number.isFinite(value) ? value : { [TAG]: String(value) };
      case 'bigint':
        return { [TAG]: `bigint:${value}` };
      case 'function':
        return { [TAG]: `function:${identityOf(functionIds, value)}` };
      case 'symbol':
        return { [TAG]: `symbol:${identityOf(symbolIds, value)}` };
      default:
        return value;
    }
  };

  return ((...args: unknown[]) => {
    const key = JSON.stringify(args, replacer);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as F;
};
