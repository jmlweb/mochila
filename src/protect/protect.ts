type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: unknown;
    };

const isPromise = <T>(value: unknown): value is Promise<T> =>
  value instanceof Promise;

/**
 * Protects a function from throwing errors by returning a `Result` object.
 * - The `success` property indicates whether the function succeeded or not.
 * - The `data` property contains the return value of the function if it succeeded.
 * - The `error` property contains the error thrown by the function if it failed.
 * - If the function returns a promise, the `data` and `error` properties will contain the resolved value and the rejected error respectively.
 *
 * @category Function
 *
 * @example
 * ```
 * const okFn = () => 'ok';
 * const errorFn = () => { throw new Error('error') };
 * const okResult = protect(okFn)(); // { success: true, data: 'ok' }
 * const errorResult = protect(errorFn)(); // { success: false, error: Error('error') }
 * ```
 */
export const protect =
  <
    A,
    R,
    T extends R extends Promise<unknown>
      ? Promise<Result<Awaited<R>>>
      : Result<R>,
  >(
    fn: (...args: A[]) => R,
  ) =>
  (...args: A[]): T => {
    try {
      const value = fn(...args);
      if (isPromise(value)) {
        return value
          .then((data: unknown) => ({
            success: true,
            data: data as Awaited<R>,
          }))
          .catch((error: unknown) => ({
            success: false,
            error,
          })) as T;
      } else {
        return {
          success: true,
          data: value,
        } as T;
      }
    } catch (e) {
      return {
        success: false,
        error: e,
      } as T;
    }
  };
