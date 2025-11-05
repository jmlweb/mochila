/**
 * Filters object properties based on a predicate function.
 * Only includes properties where the predicate returns true.
 *
 * @category Object
 * @example
 * ```
 * const isEven = (x: number) => x % 2 === 0;
 * filterObject(isEven)({ a: 1, b: 2, c: 3, d: 4 });
 * // => { b: 2, d: 4 }
 * ```
 * @param predicate - Function that returns true for values to include
 * @param obj - Object to filter
 * @returns New object with filtered properties
 * @typeParam T - Object value type
 */
export const filterObject =
  <T extends Record<string, unknown>>(predicate: (value: unknown) => boolean) =>
  (obj: T): Partial<T> => {
    const result: Partial<T> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (predicate(obj[key])) {
          result[key] = obj[key];
        }
      }
    }

    return result;
  };
