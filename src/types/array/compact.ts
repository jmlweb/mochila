type ProcessCompact<
  S extends readonly unknown[],
  Acc extends readonly unknown[] = [],
> = S extends readonly [infer Head, ...infer Tail]
  ? Head extends null | undefined
    ? ProcessCompact<Tail, Acc>
    : ProcessCompact<Tail, [...Acc, Head]>
  : Readonly<Acc>;

/**
 * Removes all `null` and `undefined` values from the given array type.
 *
 * @category Array
 */
export type Compact<S extends readonly unknown[]> = S extends readonly [
  unknown,
  ...unknown[],
]
  ? ProcessCompact<S>
  : S extends readonly [...unknown[]]
    ? readonly NonNullable<S[number]>[]
    : NonNullable<S[number]>[];
