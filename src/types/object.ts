export type UnknownRecord = Record<string | number, unknown>;

export type ValueOf<O extends UnknownRecord> = O[keyof O];

export type NonReadonly<A extends ReadonlyArray<unknown> | UnknownRecord> = {
  -readonly [K in keyof A]: A[K];
};

export type WithPartial<Source, Keys extends keyof Source> = {
  [K in Exclude<keyof Source, Keys>]: Source[K];
} & {
  [K in Extract<keyof Source, Keys>]?: Source[K];
};

export type WithRequired<Source, Keys extends keyof Source> = {
  [K in Exclude<keyof Source, Keys>]: Source[K];
} & {
  [K in Extract<keyof Source, Keys>]-?: Exclude<Source[K], undefined>;
};
