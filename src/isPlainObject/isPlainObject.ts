import { isObject } from '../isObject';
import { UnknownRecord } from '../types';

export const isPlainObject = <T>(x: T): x is Extract<T, UnknownRecord> =>
  isObject(x) && x.constructor === Object;
