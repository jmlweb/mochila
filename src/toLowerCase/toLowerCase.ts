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
 * toLowerCaseW('Hello, world!') // 'hello, world!'
 * ```
 */
export const toLowerCaseW = (s: string) => s.toLowerCase();

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
  toLowerCaseW(s) as Lowercase<S>;
