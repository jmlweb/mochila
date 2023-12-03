/**
 * Converts a string to uppercase returning string as type
 *
 * @category String
 *
 * @param s - The string to convert.
 * @returns The converted string.
 *
 * @example
 * ```
 * toUpperCaseL('Hello, world!') // 'HELLO, WORLD!'
 * ```
 */
export const toUpperCaseL = (s: string) => s.toUpperCase();

/**
 * Converts a string to uppercase returning Uppercase<S> as type
 *
 * @category String
 *
 * @typeParam S - The string type.
 * @param s - The string to convert.
 * @returns The converted string.
 *
 * @example
 * ```
 * toUpperCase('Hello, world!') // 'HELLO, WORLD!'
 * ```
 */
export const toUpperCase = <S extends string>(s: S) =>
  toUpperCaseL(s) as Uppercase<S>;
