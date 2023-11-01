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
