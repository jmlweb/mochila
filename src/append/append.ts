import { isString } from '../is';
import { type IsWideString, type Stringifiable } from '../types';

type AppendString<V extends Stringifiable, S extends string> =
  IsWideString<S | V> extends true ? string : `${S}${V}` & string;

type Append<
  V,
  S extends V extends Stringifiable
    ? string | readonly unknown[]
    : readonly unknown[],
> = S extends string
  ? V extends Stringifiable
    ? AppendString<V, S>
    : never
  : [...S[], V];

/**
 * Appends a value to the end of a string or array.
 *
 * @param value - The value to append.
 *
 * @category String
 * @category Array
 *
 * @example
 * ```typescript
 * append('c')('ab'); // -> 'abc'
 * append(2)('ab'); // -> 'ab2'
 * append('c')(['a', 'b']); // -> ['a', 'b', 'c']
 * append(2)(['a', 'b']); // -> ['a', 'b', 2]
 * ```
 */
export const append =
  <V>(value: V) =>
  <
    S extends V extends Stringifiable
      ? string | readonly unknown[]
      : readonly unknown[],
  >(
    source: S,
  ): Append<V, S> => {
    if (isString(source)) {
      return `${source}${value}` as Append<V, S>;
    }
    return [...source, value] as Append<V, S>;
  };
