/**
 * Capitalizes the first letter of a string.
 *
 * @category String
 * @see {@link capitalize}
 *
 * @param x - The string to capitalize.
 * @returns The capitalized string with a wide string type.
 *
 * @example
 * ```
 * let a = capitalizeW('foo'); // a has type string
 * a = 'bar'; // OK
 * ```
 */
export const capitalizeW = (x: string) =>
  x.charAt(0).toUpperCase() + x.slice(1);

/**
 * Capitalizes the first letter of a string.
 *
 * @category String
 * @see {@link capitalizeW}
 * @see {@link Capitalize}
 *
 * @typeParam S - The string type.
 * @param x - The string to capitalize.
 * @returns The capitalized string with a Capitalize<string> type.
 *
 * @example
 * ```
 * let a = capitalize('foo'); // a has type 'Foo'
 * a = 'bar'; // Error: Type '"bar"' is not assignable to type '"Foo"'
 * ```
 */
export const capitalize = <S extends string>(x: S) =>
  capitalizeW(x) as Capitalize<S>;
