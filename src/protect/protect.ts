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
 * Protects a function or promise from throwing errors.
 * @template A - The function's arguments.
 * @template R - The function's return type.
 * @template T - The resulting type of the protected function.
 * @param {function} fn - The function to protect.
 * @returns {function} A function that returns a result object with a success flag and either the function's return/resolved value or the error object.
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
          .then((data) => ({
            success: true,
            data,
          }))
          .catch((error) => ({
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
