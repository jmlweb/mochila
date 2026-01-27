import { type SubTypeOr } from '../extends';
import { type Absolute, type IsNegative, type IsWideNumber } from '../number';
import { type IsNonEmptyArray, type Reverse } from './arrayHelpers';

/**
 * Returns the element at index `P` in `S`.
 *
 * @category Array
 */
export type At<
  P extends number,
  S extends readonly unknown[],
  DefaultAt = S[number] | undefined,
> = SubTypeOr<
  IsWideNumber<P> extends true
    ? DefaultAt
    : IsNonEmptyArray<S> extends true
      ? IsNegative<P> extends true
        ? [never, ...Reverse<S>][Absolute<P>]
        : S[P]
      : DefaultAt,
  DefaultAt
>;
