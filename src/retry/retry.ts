/**
 * Configuration for retry behavior
 */
export interface RetryConfig {
  /**
   * Maximum number of attempts (default: 3)
   */
  maxAttempts?: number;
  /**
   * Initial delay in milliseconds (default: 100)
   */
  initialDelayMs?: number;
  /**
   * Multiplier for exponential backoff (default: 2)
   */
  backoffMultiplier?: number;
  /**
   * Maximum delay in milliseconds (default: 30000)
   */
  maxDelayMs?: number;
}

/**
 * Retries an async function with exponential backoff.
 * Useful for handling transient failures in network requests, etc.
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
export const retry =
  (config: RetryConfig = {}) =>
  <T>(fn: () => Promise<T>): (() => Promise<T>) => {
    const {
      maxAttempts = 3,
      initialDelayMs = 100,
      backoffMultiplier = 2,
      maxDelayMs = 30000,
    } = config;

    return async () => {
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
