type PathResult<K extends string, O> = string extends K
  ? unknown
  : Record<PropertyKey, never> extends O
    ? unknown
    : K extends `${infer L}.${infer R}`
      ? L extends keyof O
        ? PathResult<R, O[L]>
        : undefined
      : K extends keyof O
        ? O[K]
        : undefined;

/**
 * Given a path in form of a string, returns a function that extracts the value at that path from an object.
 *
 * @param path - The path to extract the value from. The path should be a string with keys separated by dots.
 *
 * @category Object
 *
 * @example
 * ```
 * const obj = { a: { b: { c: 1 } } } as const;
 * const a = path('a.b.c')(obj); // 1
 * const b = path('a.s')(obj); // undefined
 * ```
 */
export const path =
  <K extends string>(key: K) =>
  <O>(o: O): PathResult<K, O> => {
    const keys = key.split('.').filter((k) => k.length > 0);
    if (keys.length === 0) {
      return undefined as PathResult<K, O>;
    }
    if (o == null || typeof o !== 'object') {
      return undefined as PathResult<K, O>;
    }
    let value: unknown = o;
    const length = keys.length;
    for (let i = 0; i < length; i++) {
      const key = keys[i];
      value = (value as Record<string, unknown>)[key as keyof typeof value];
      if ((value == null || typeof value !== 'object') && i < length - 1) {
        return undefined as PathResult<K, O>;
      }
    }

    return value as PathResult<K, O>;
  };
