import { parsePosition } from '../parsePosition';
import { DeleteAt } from '../types';

/**
 * Returns a new array with the element at the specified position removed.
 *
 * - If the position is negative, the element will be removed from the end of the array.
 * - If the position is out of bounds, a new array with the same elements will be returned.
 *
 * @category Array
 *
 * @see {@link DeleteAt}
 *
 * @example
 * ```
 * const a = [1, 2, 3, 4, 5];
 * const b = deleteAt(2)(a); // [1, 2, 4, 5]
 * const c = deleteAt(-2)(a); // [1, 2, 3, 5]
 * const d = deleteAt(10)(a); // [1, 2, 3, 4, 5]
 * ```
 */
export const deleteAt =
  <P extends number>(position: P) =>
  <S extends ReadonlyArray<unknown>>(source: S) => {
    const parsedPosition = parsePosition(position)(source);
    return [
      ...source.slice(0, parsedPosition),
      ...source.slice(parsedPosition + 1),
    ] as DeleteAt<P, S>;
  };
