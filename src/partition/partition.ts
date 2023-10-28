import { isString } from '../isString';
import { ProtectIfNonEmptyArray } from '../types';

export const partition =
  <T>(fn: (arg: T) => boolean) =>
  <A extends ReadonlyArray<T>>(arr: A) => {
    const left: T[] = [];
    const right: T[] = [];
    for (const item of arr) {
      if (fn(item)) {
        left.push(item);
      } else {
        right.push(item);
      }
    }
    return [left, right] as readonly [
      ProtectIfNonEmptyArray<A>,
      ProtectIfNonEmptyArray<A>,
    ];
  };

const result = partition(isString)([1, 2, 3, 4, 5, 6, 'a'] as const);
const result2 = ([1, 2, 3, 4, 5, 6, 'a'] as const).filter(isString);
