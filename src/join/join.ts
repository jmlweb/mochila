/**
 * Joins the elements of an array into a string using a specified separator.
 *
 * @category Array
 *
 * @example
 * ```
 * join(', ', [1, 2, 3]); // => '1, 2, 3'
 * ```
 */
export const join =
  <S extends string>(separator: S) =>
  <T>(list: ReadonlyArray<T>) =>
    list.join(separator);
