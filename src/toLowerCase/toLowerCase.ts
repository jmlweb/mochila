/**
 * Converts a string to lowercase returning string as type
 *
 * @category String
 *
 * @param s - The string to convert.
 * @returns The converted string.
 *
 * @example
 * ```
 * toLowerCaseL('Hello, world!') // 'hello, world!'
 * ```
 */
export const toLowerCaseL = (s: string) => s.toLowerCase();

/**
 * Converts a string to lowercase returning LowerCase<S> as type
 *
 * @category String
 *
 * @typeParam S - The string type.
 * @param s - The string to convert.
 * @returns The converted string.
 *
 * @example
 * ```
 * toLowerCase('Hello, world!') // 'hello, world!'
 * ```
 */
export const toLowerCase = <S extends string>(s: S) =>
  toLowerCaseL(s) as Lowercase<S>;
