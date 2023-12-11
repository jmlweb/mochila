/**
 * Normalizes a position to a positive number.
 *
 * @category Array
 *
 * @example
 * ```
 * parsePosition(0)([1, 2, 3]); // 0
 * parsePosition(1)([1, 2, 3]); // 1
 * parsePosition(2)([1, 2, 3]); // 2
 * parsePosition(-1)([1, 2, 3]); // 2
 * parsePosition(-2)([1, 2, 3]); // 1
 * ```
 */
export const parsePosition =
  (position: number) => (source: ReadonlyArray<unknown>) =>
    position < 0 ? source.length + position : position;
