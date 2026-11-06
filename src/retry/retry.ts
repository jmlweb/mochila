/**
 * Configuration for retry behavior
 */
export type RetryConfig = {
  /**
   * Maximum number of attempts (default: 3). Must be at least 1.
   */
  maxAttempts?: number;
  /**
   * Initial delay in milliseconds (default: 100). Must not be negative.
   */
  initialDelayMs?: number;
  /**
   * Multiplier for exponential backoff (default: 2). Must not be negative.
   */
  backoffMultiplier?: number;
  /**
   * Maximum delay in milliseconds (default: 30000). Must not be negative.
   */
  maxDelayMs?: number;
};

/**
 * Retries an async function with exponential backoff.
 * Useful for handling transient failures in network requests, etc.
 *
 * Throws an `Error` when `retry(config)` is called with a `maxAttempts` below
 * 1 or `NaN`, or a `NaN` or negative `initialDelayMs`, `backoffMultiplier`
 * or `maxDelayMs`.
 *
 * @category Promise
 * @example
 * ```
 * const fetchWithRetry = retry({ maxAttempts: 3 })(fetchData);
 * const data = await fetchWithRetry();
 * ```
 * @param config - Retry configuration
 * @param fn - Async function to retry
 * @returns Wrapped function that retries on failure
 * @typeParam T - Return type of the function
 */
export const retry = (config: RetryConfig = {}) => {
  const {
    maxAttempts = 3,
    initialDelayMs = 100,
    backoffMultiplier = 2,
    maxDelayMs = 30000,
  } = config;

  if (!(maxAttempts >= 1)) {
    throw new Error('maxAttempts must be at least 1');
  }
  if (!(initialDelayMs >= 0)) {
    throw new Error('initialDelayMs must be a non-negative number');
  }
  if (!(backoffMultiplier >= 0)) {
    throw new Error('backoffMultiplier must be a non-negative number');
  }
  if (!(maxDelayMs >= 0)) {
    throw new Error('maxDelayMs must be a non-negative number');
  }

  return <T>(fn: () => Promise<T>): (() => Promise<T>) =>
    async () => {
      let lastError: Error | undefined;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
          return await fn();
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));

          if (attempt < maxAttempts - 1) {
            const delay = Math.min(
              initialDelayMs * Math.pow(backoffMultiplier, attempt),
              maxDelayMs,
            );
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }

      throw lastError;
    };
};
