/**
 * Applies a transformation function to each element of an array and returns a new array with the transformed elements.
 * @template From The type of the elements in the source array.
 * @template To The type of the elements in the resulting array.
 * @param {function} transformation A function that transforms an element from type `From` to type `To`.
 * @returns {function} A function that takes an array of type `From` and returns an array of type `To`.
 */
export const map =
  <From, To>(transformation: (x: From) => To) =>
  (source: ReadonlyArray<From> | From[]) =>
    source.map(transformation);
