import { AnyFn } from '../types';

/**
 * Determines if a value is a function.
 * @param fn - The value to check.
 * @returns True if the value is a function, false otherwise.
 */
export const isFunction = <T>(fn: T): fn is Extract<T, AnyFn> => {
  return typeof fn === 'function';
};
