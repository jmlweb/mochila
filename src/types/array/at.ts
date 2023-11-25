import { SubTypeOr } from '../extends';
import { Absolute, IsNegative, IsWideNumber } from '../number';
import { IsNonEmptyArray, Reverse } from './arrayHelpers';

export type At<
  P extends number,
  S extends ReadonlyArray<unknown>,
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
