import { isFunction } from '../isFunction';
import { AnyFn, Assertion } from '../types';

export const assertIsFunction: Assertion<AnyFn> = (x) => {
  if (!isFunction(x)) {
    throw new Error('Expected a function');
  }
};
