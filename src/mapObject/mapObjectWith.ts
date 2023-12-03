/**
 * Maps an object's values to a new set of values using a transformation function.
 *
 * The type of the result is an object preserving the keys and inferring the type of each value based on the transformation function.
 *
 * @category Object
 *
 * @example
 * ```
 * const obj = { a: 1, b: 2, c: 3 };
 * const double = (x: number) => x * 2;
 * const a = mapObjectWith(obj)(double); // { a: 2, b: 4, c: 6 }
 * // type { a: number, b: number, c: number }
 * ```
 */
export const mapObjectWith =
  <From, Source extends Record<string, From>>(source: Source) =>
  <To>(transformation: (x: Source[keyof Source]) => To) =>
    Object.fromEntries(
      Object.entries(source).map(([key, val]) => [
        key,
        transformation(val as Source[keyof Source]),
      ]),
    ) as {
      [K in keyof Source]: To;
    };
