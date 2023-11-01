export type ProcessCompact<
  S extends ReadonlyArray<unknown>,
  Acc extends ReadonlyArray<unknown> = [],
> = S extends readonly [infer Head, ...infer Tail]
  ? Head extends null | undefined
    ? ProcessCompact<Tail, Acc>
    : ProcessCompact<Tail, [...Acc, Head]>
  : Readonly<Acc>;

export type Compact<S extends ReadonlyArray<unknown>> = S extends readonly [
  unknown,
  ...unknown[],
]
  ? ProcessCompact<S>
  : S extends readonly [...unknown[]]
  ? ReadonlyArray<NonNullable<S[number]>>
  : NonNullable<S[number]>[];
