/**
 * Recursively merges source object into target object.
 * Handles nested objects, arrays, and primitives.
 * Does not mutate original objects.
 *
 * @category Object
 * @example
 * ```
 * const target = { a: 1, b: { c: 2 } };
 * const source = { b: { d: 3 } };
 * deepMerge(source)(target);
 * // => { a: 1, b: { c: 2, d: 3 } }
 * ```
 * @param source - Source object to merge from
 * @param target - Target object to merge into
 * @returns Merged object with source values recursively merged into target
 * @typeParam T - Target object type
 * @typeParam S - Source object type
 */
export const deepMerge =
  <S extends Record<string, unknown>>(source: S) =>
  <T extends Record<string, unknown>>(target: T): T & S => {
    const result = { ...target } as T & S;

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const targetValue = (result as Record<string, unknown>)[key];

        if (
          sourceValue !== null &&
          typeof sourceValue === 'object' &&
          !Array.isArray(sourceValue) &&
          targetValue !== null &&
          typeof targetValue === 'object' &&
          !Array.isArray(targetValue)
        ) {
          (result as Record<string, unknown>)[key] = deepMerge(
            sourceValue as Record<string, unknown>,
          )(targetValue as Record<string, unknown>);
        } else {
          (result as Record<string, unknown>)[key] = sourceValue;
        }
      }
    }

    return result;
  };
