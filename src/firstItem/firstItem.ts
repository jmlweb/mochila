import { at } from '../at';

/**
 * Returns the first item of an array.
 *
 * @category Array
 *
 * @see {@link at}
 *
 * @param array - The array to get the first item of.
 * @returns The first item of the array, or `undefined` if the array is empty.
 *
 * @example
 * ```
 * firstItem([1, 2, 3]); // => 1
 * firstItem([]); // => undefined
 * ```
 */
export const firstItem = at(0);
