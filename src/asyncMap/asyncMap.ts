/**
 * Maps over an array with an async function, resolving all promises concurrently.
 * Similar to Promise.all(array.map(...)).
 *
 * @category Array
 * @example
 * ```
 * const fetchUser = (id: number) => fetch(`/api/users/${id}`);
 * await asyncMap(fetchUser)([1, 2, 3]);
 * // => [User, User, User]
 * ```
 * @param fn - Async function to apply to each element
 * @param array - Array of items to map
 * @returns Promise resolving to array of mapped values
 * @typeParam T - Input element type
 * @typeParam U - Output element type
 */
export const asyncMap =
  <T, U>(fn: (item: T) => Promise<U>) =>
  async (array: ReadonlyArray<T>): Promise<U[]> => {
    return Promise.all(array.map(fn));
  };
