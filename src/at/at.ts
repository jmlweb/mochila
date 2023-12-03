import { At } from '../types';

/**
 * Returns the element at the specified position in the source array.
 *
 * It produces the same wide type as the "at" method of the source array.
 *
 * @category Array
 * @see {@link at}
 *
 * @example
 * ```
 * at(0)([1, 2, 3]); // 1 with type number
 * at(1)([1, 2, 3] as const); // 2 with literal type 2
 * at(-1)([1, 2, 3] as const); // 3 with literal type 3
 *```
 */
export const atW =
  (position: number) =>
  <S extends ReadonlyArray<unknown>>(source: S): S[number] | undefined =>
    source.at(position);

/**
 * Returns the element at the specified position in the source array.
 *
 * It tries to infer the type of the element at the specified position.
 * When not possible, it produces the same wide type as the "at" method of the source array.
 *
 * @category Array
 * @see {@link atW}
 * @see {@link At}
 *
 * @example
 * ```
 * at(0)([1, 2, 3]); // 1 with type number
 * at(1)([1, 2, 3] as const); // 2 with literal type 2
 * at(-1)([1, 2, 3] as const); // 3 with literal type 3
 *```
 */
export const at =
  <P extends number>(position: P) =>
  <S extends ReadonlyArray<unknown>>(source: S): At<P, S> =>
    source.at(position) as At<P, S>;
