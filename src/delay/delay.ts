/**
 * Returns a promise that resolves with the given value after specified milliseconds.
 * Useful for async delays, rate limiting, or creating scheduled operations.
 *
 * @category Promise
 * @example
 * ```
 * await delay(1000)(42);
 * // => 42 (after 1 second)
 * ```
 * @param milliseconds - Number of milliseconds to delay
 * @param value - Value to resolve with
 * @returns Promise that resolves to the value after delay
 * @typeParam T - Value type
 */
export const delay =
  <T>(milliseconds: number) =>
  (value: T): Promise<T> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(value), milliseconds);
    });
