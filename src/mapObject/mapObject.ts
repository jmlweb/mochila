/**
 * Maps an object's values to a new type using a transformation function.
 *
 * The type of the result is a Record where the keys are the same as the original object and the values are a union of all the possible types that the transformation function can return.
 *
 * If you know the type of the object on anticipation, you can use the `mapObjectWith` function that will preserve the exact type for each value.
 *
 * @category Object
 *
 * @example
 * ```
 * const obj = { a: 1, b: 2, c: 3 };
 * const double = (x: number) => x * 2;
 * const a = mapObject(double)(obj); // { a: 2, b: 4, c: 6 }
 * // type Record<"a" | "b" | "c", number>
 * ```
 */
export const mapObject =
  <From, To>(transformation: (x: From) => To) =>
  <K extends string>(obj: Record<K, From>) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        key,
        transformation(val as From),
      ]),
    ) as Record<K, To>;
