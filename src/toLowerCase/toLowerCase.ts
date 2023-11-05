/**
 * Converts a string to lowercase.
 * @param s - The string to convert.
 * @returns The converted string.
 */
export const toLowerCaseL = (s: string) => s.toLowerCase();

/**
 * Converts a string to lowercase.
 * @template S - The string type.
 * @param {S} s - The string to convert.
 * @returns {Lowercase<S>} The lowercase version of the input string.
 */
export const toLowerCase = <S extends string>(s: S) =>
  toLowerCaseL(s) as Lowercase<S>;
