import { isTupleable } from '../isTupleable';
import { Tupleable } from '../types';

type AssertIsTupeable = <T>(x: ReadonlyArray<T>) => asserts x is Tupleable<T>;

export const assertIsTupleable: AssertIsTupeable = (x) => {
  if (!isTupleable(x)) {
    throw new Error('Expected a tupeable');
  }
};
