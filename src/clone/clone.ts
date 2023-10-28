import { isArray } from '../isArray';
import { isFunction } from '../isFunction';
import { isPlainObject } from '../isPlainObject';

export const clone = <T>(value: T): T => {
  if (isArray(value)) {
    return [...value] as T;
  }
  if (isPlainObject(value)) {
    return { ...value };
  }
  if (isFunction(value)) {
    return ((...args: Parameters<typeof value>): ReturnType<typeof value> =>
      value(...args)) as typeof value;
  }
  return value;
};
