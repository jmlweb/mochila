import { AnyFn } from '../types';

export const isFunction = <T>(fn: T): fn is Extract<T, AnyFn> => {
  return typeof fn === 'function';
};
