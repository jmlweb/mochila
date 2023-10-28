export type BiReadonlyArray<T> = ReadonlyArray<ReadonlyArray<T>>;

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type Tupleable<T> = readonly [T, T, ...T[]];
