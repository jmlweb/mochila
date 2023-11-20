/**
 * Joins the elements of an array into a string using a specified separator.
 */
export const join =
  <S extends string>(separator: S) =>
  <T>(list: ReadonlyArray<T>) =>
    list.join(separator);
