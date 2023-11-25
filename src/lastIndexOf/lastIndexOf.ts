import { reverse } from '../reverse';

/**
 * Returns the last index at which a given value can be found in an array.
 *
 * @example
 * const arr = [1, 2, 3, 4, 2, 5];
 * lastIndexOf(2)(arr); // 4
 * lastIndexOf(6)(arr); // -1
 * lastIndexOf(2, 3)(arr); // 4
 */
export const lastIndexOf =
  (value: unknown, fromIndex?: number) => (source: ReadonlyArray<unknown>) => {
    if (source.indexOf(value, fromIndex) === -1) {
      return -1;
    }
    const position = reverse(source).indexOf(
      value,
      fromIndex ? source.length - 1 - fromIndex : undefined,
    );
    return source.length - 1 - position;
  };
