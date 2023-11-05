/**
 * Maps an object's values to a new set of values using a transformation function.
 * @template From - The type of the values in the source object.
 * @template Source - The type of the source object.
 * @param {Source} source - The object to map.
 * @returns {function} A function that takes a transformation function and returns a new object with the mapped values.
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
