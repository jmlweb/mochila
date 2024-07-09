/**
 * Curriefied version of `Array.prototype.slice`
 *
 * @category Array
 *
 * @example
 * ```
 * const source = [1, 2, 3];
 * slice(0, 1)(source) // [1] with type number[]
 * ```
 */
export const slice =
  (start?: number, end?: number) =>
  <T>(arr: ReadonlyArray<T>) =>
    arr.slice(start, end);
