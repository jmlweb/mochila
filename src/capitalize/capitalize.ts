/**
 * Capitalizes the first letter of a string.
 * @param x - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalizeL = (x: string) =>
  x.charAt(0).toUpperCase() + x.slice(1);

/**
 * Capitalizes the first letter of a string.
 * @template S - The string type.
 * @param {S} x - The string to capitalize.
 * @returns {Capitalize<S>} The capitalized string.
 */
export const capitalize = <S extends string>(x: S) =>
  capitalizeL(x) as Capitalize<S>;
