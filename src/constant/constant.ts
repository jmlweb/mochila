import { Constant } from '../types';

export const constant =
  <V>(value: V): Constant<V> =>
  () =>
    value;
