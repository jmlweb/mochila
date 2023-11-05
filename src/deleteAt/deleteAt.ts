import { DeleteAt } from '../types';

/**
 * Returns a new array with the element at the specified position removed.
 * @template P - The position of the element to remove.
 * @param {P} position - The position of the element to remove.
 * @returns {function} A curried function that takes an array and returns a new array with the element at the specified position removed.
 */
export const deleteAt =
  <P extends number>(position: P) =>
  <S extends ReadonlyArray<unknown>>(source: S) => {
    const parsedPosition = position < 0 ? source.length + position : position;
    return [
      ...source.slice(0, parsedPosition),
      ...source.slice(parsedPosition + 1),
    ] as DeleteAt<P, S>;
  };
