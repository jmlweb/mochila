import { AnyFn } from '../types';

/**
 * Performs a series of function calls on a value, passing the result of each function call to the next.
 *
 * @category Function
 *
 * @example
 * ```
 * const add = (a: number, b: number) => a + b;
 * const byTwo = (x: number) => x * 2;
 * const result = flow(1, add, byTwo);
 * ```
 */

export function flow<A, R>(a: A, fn1: (x: A) => R): R;

export function flow<A, B, R>(a: A, fn1: (x: A) => B, fn2: (x: B) => R): R;

export function flow<A, B, C, R>(
  a: A,
  fn1: (x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => R,
): R;

export function flow<A, B, C, D, R>(
  a: A,
  fn1: (x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => R,
): R;

export function flow<A, B, C, D, E, R>(
  a: A,
  fn1: (x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => E,
  fn5: (x: E) => R,
): R;

export function flow<A, B, C, D, E, F, R>(
  a: A,
  fn1: (x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => E,
  fn5: (x: E) => F,
  fn6: (x: F) => R,
): R;

export function flow<A, B, C, D, E, F, G, R>(
  a: A,
  fn1: (x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => E,
  fn5: (x: E) => F,
  fn6: (x: F) => G,
  fn7: (x: G) => R,
): R;

export function flow<A, B, C, D, E, F, G, H, R>(
  a: A,
  fn1: (x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => E,
  fn5: (x: E) => F,
  fn6: (x: F) => G,
  fn7: (x: G) => H,
  fn8: (x: H) => R,
): R;

export function flow<A, B, C, D, E, F, G, H, I, R>(
  a: A,
  fn1: (x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => E,
  fn5: (x: E) => F,
  fn6: (x: F) => G,
  fn7: (x: G) => H,
  fn8: (x: H) => I,
  fn9: (x: I) => R,
): R;

export function flow(a: unknown, ...fns: AnyFn[]) {
  return fns.reduce((acc, fn) => fn(acc), a);
}
