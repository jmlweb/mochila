/**
 * Memoizes a function, caching results based on arguments.
 * Works best with pure functions with small input spaces.
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
export const memoize = <F extends (...args: unknown[]) => unknown>(
  fn: F,
): F => {
  const cache = new Map<string, unknown>();

  return ((...args: unknown[]) => {
    // eslint-disable-next-line no-magic-numbers
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...(args as Parameters<F>));
    cache.set(key, result);
    return result;
  }) as F;
};
