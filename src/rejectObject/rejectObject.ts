/**
 * Rejects object properties based on a predicate function.
 * Opposite of filterObject - only includes properties where the predicate returns false.
 *
 * @category Object
 * @example
 * ```
 * const isEven = (x: number) => x % 2 === 0;
 * rejectObject(isEven)({ a: 1, b: 2, c: 3, d: 4 });
 * // => { a: 1, c: 3 }
 * ```
 * @param predicate - Function that returns true for values to exclude
 * @param obj - Object to filter
 * @returns New object with rejected properties removed
 * @typeParam T - Object value type
 */
export const rejectObject =
  <T extends Record<string, unknown>>(predicate: (value: unknown) => boolean) =>
  (obj: T): Partial<T> => {
    const result: Partial<T> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (!predicate(obj[key])) {
          result[key] = obj[key];
        }
      }
    }

    return result;
  };
