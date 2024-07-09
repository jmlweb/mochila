/**
 * Represents an object with keys consisting of numbers or strings and unknown values.
 *
 * @category Object
 */
export type UnknownRecord<K = string | number> = Record<K, unknown>;

/**
 * Extracts the type of the values of an object.
 *
 * @category Object
 */
export type ValueOf<O extends UnknownRecord> = O[keyof O];

/**
 * Represents a type that removes the readonly modifier from all properties of a given object.
 *
 * @category Object
 */
export type NonReadonly<A extends ReadonlyArray<unknown> | UnknownRecord> = {
  -readonly [K in keyof A]: A[K];
};

/**
 * Represents a type that adds the optional modifier to the keys passed.
 *
 * @category Object
 */
export type WithPartial<Source, Keys extends keyof Source> = {
  [K in Exclude<keyof Source, Keys>]: Source[K];
} & {
  [K in Extract<keyof Source, Keys>]?: Source[K];
};

/**
 * Represents a type that adds the required modifier to the keys passed.
 *
 * @category Object
 */
export type WithRequired<Source, Keys extends keyof Source> = {
  [K in Exclude<keyof Source, Keys>]: Source[K];
} & {
  [K in Extract<keyof Source, Keys>]-?: Exclude<Source[K], undefined>;
};
