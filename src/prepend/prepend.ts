import { isString } from '../is';
import { IsWideString, Stringifiable } from '../types';

type PrependString<V extends Stringifiable, S extends string> =
  IsWideString<S | V> extends true ? string : `${V}${S}` & string;

type Prepend<
  V,
  S extends V extends Stringifiable
    ? string | ReadonlyArray<unknown>
    : ReadonlyArray<unknown>,
> = S extends string
  ? V extends Stringifiable
    ? PrependString<V, S>
    : never
  : [V, ...S[]];

/**
 * Prepends a value to the start of a string or array.
 *
 * @param value - The value to prepend.
 *
 * @category String
 * @category Array
 *
 * @example
 * ```typescript
 * prepend('c')('ab'); // -> 'cab'
 * prepend(2)('ab'); // -> '2ab'
 * prepend('c')(['a', 'b']); // -> ['c', 'a', 'b']
 * prepend(2)(['a', 'b']); // -> [2, 'a', 'b']
 * ```
 */
export const prepend =
  <V>(value: V) =>
  <
    S extends V extends Stringifiable
      ? string | ReadonlyArray<unknown>
      : ReadonlyArray<unknown>,
  >(
    source: S,
  ): Prepend<V, S> => {
    if (isString(source)) {
      return `${value}${source}` as Prepend<V, S>;
    }
    return [value, ...source] as Prepend<V, S>;
  };
