/**
 * Represents an object with keys consisting of numbers or strings and unknown values.
 */
export type UnknownRecord = Record<string | number, unknown>;

/**
 * Extracts the type of the values of an object.
 */
export type ValueOf<O extends UnknownRecord> = O[keyof O];

/**
 * Represents a type that removes the readonly modifier from all properties of a given object.
 */
export type NonReadonly<A extends ReadonlyArray<unknown> | UnknownRecord> = {
  -readonly [K in keyof A]: A[K];
};

/**
 * Represents a type that adds the optional modifier to the keys passed.
 */
export type WithPartial<Source, Keys extends keyof Source> = {
  [K in Exclude<keyof Source, Keys>]: Source[K];
} & {
  [K in Extract<keyof Source, Keys>]?: Source[K];
};

/**
 * Represents a type that adds the required modifier to the keys passed.
 */
export type WithRequired<Source, Keys extends keyof Source> = {
  [K in Exclude<keyof Source, Keys>]: Source[K];
} & {
  [K in Extract<keyof Source, Keys>]-?: Exclude<Source[K], undefined>;
};
