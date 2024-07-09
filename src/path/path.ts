import { isPlainObject } from '../is';
import { UnknownRecord } from '../types';

type AnyNestedValue<O extends UnknownRecord> =
  | (O[keyof O] extends UnknownRecord
      ? O[keyof O] | AnyNestedValue<O[keyof O]>
      : O[keyof O])
  | undefined;

type ExtractValue<P extends string[], O extends UnknownRecord> = P extends [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? Head extends keyof O
    ? O[Head] extends UnknownRecord
      ? ExtractValue<Tail, O[Head]>
      : O[Head]
    : undefined
  : O;

type StrPathToArr<P extends string> = P extends `${infer K}.${infer R}`
  ? [K, ...StrPathToArr<R>]
  : P extends ''
    ? []
    : [P];

export type Path<P extends string, O extends UnknownRecord> = string extends P
  ? AnyNestedValue<O>
  : ExtractValue<StrPathToArr<P>, O>;

const extractValue = <A extends string[], O extends UnknownRecord>(
  parts: A,
  obj: O,
): ExtractValue<A, O> => {
  const [head, ...tail] = parts;
  if (head === undefined) {
    return undefined as ExtractValue<A, O>;
  }
  const value = obj[head];
  if (tail.length === 0) {
    return value as ExtractValue<A, O>;
  }
  if (!isPlainObject(value)) {
    return undefined as ExtractValue<A, O>;
  }
  return extractValue(tail, value) as ExtractValue<A, O>;
};

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
  <P extends string>(path: P) =>
  <O extends UnknownRecord>(object: O) =>
    extractValue(path.split('.') as StrPathToArr<P>, object) as Path<P, O>;
