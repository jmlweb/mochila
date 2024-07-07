import {
  isArray,
  isDate,
  isNullable,
  isNumber,
  isObject,
  isRegExp,
} from '../is';

export const makeIsDeepEqual = ({
  optimizeForReact = true,
  strictNullComparison = true,
  maxDepth = -1,
}: {
  optimizeForReact?: boolean;
  maxDepth?: number;
  strictNullComparison?: boolean;
} = {}) => {
  const internalIsDeepEqual = (
    a: unknown,
    b: unknown,
    depth: number,
  ): boolean => {
    if (a === b || (!strictNullComparison && isNullable(a) && isNullable(b))) {
      return true;
    }

    if (isNumber(a) && isNumber(b)) {
      return isNaN(a) && isNaN(b);
    }

    if (isDate(a) && isDate(b)) {
      return a.getTime() === b.getTime();
    }

    if (isRegExp(a) && isRegExp(b)) {
      return a.source === b.source && a.flags === b.flags;
    }

    if ((maxDepth > 0 && depth > maxDepth) || !isObject(a) || !isObject(b)) {
      return false;
    }

    if (a.constructor !== b.constructor) {
      return false;
    }

    if (isArray(a) && isArray(b)) {
      return (
        a.length === b.length &&
        a.every((item, index) => internalIsDeepEqual(item, b[index], depth + 1))
      );
    }

    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf();
    }

    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString();
    }

    const keys = Object.keys(a);

    if (keys.length !== Object.keys(b).length) {
      return false;
    }

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!key || !Object.prototype.hasOwnProperty.call(b, key)) {
        return false;
      }
      if (optimizeForReact && key === '_owner' && '$$typeof' in a) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        continue;
      }
      if (
        !internalIsDeepEqual(
          a[key as keyof typeof a],
          b[key as keyof typeof b],
          depth + 1,
        )
      ) {
        return false;
      }
    }

    return true;
  };
  return (a: unknown) => (b: unknown) => internalIsDeepEqual(a, b, 0);
};
