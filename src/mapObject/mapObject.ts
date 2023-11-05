/**
 * Maps an object's values to a new type using a transformation function.
 * @template From The original type of the object's values.
 * @template To The new type of the object's values.
 * @param {function} transformation The function used to transform the object's values.
 * @returns {function} A function that takes an object and returns a new object with the transformed values.
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
