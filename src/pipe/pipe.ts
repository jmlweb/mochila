import { AnyFn } from '../types';

/**
 * Composes multiple functions into a single function that can be called with multiple arguments.
 *
 * @category Function
 *
 * @example
 * ```
 * const add = (a: number, b: number) => a + b;
 * const byTwo = (x: number) => x * 2;
 * const composedFn = pipe(add, byTwo);
 * composedFn(1, 2) // 6
 * ```
 */
export function pipe<A extends unknown[], R>(fn1: (...x: A) => R): typeof fn1;

export function pipe<A extends unknown[], B, R>(
  fn1: (...x: A) => B,
  fn2: (x: B) => R,
): (...a: A) => R;

export function pipe<A extends unknown[], B, C, R>(
  fn1: (...x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => R,
): (...a: A) => R;

export function pipe<A extends unknown[], B, C, D, R>(
  fn1: (...x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => R,
): (...a: A) => R;

export function pipe<A extends unknown[], B, C, D, E, R>(
  fn1: (...x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => E,
  fn5: (x: E) => R,
): (...a: A) => R;

export function pipe<A extends unknown[], B, C, D, E, F, R>(
  fn1: (...x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => E,
  fn5: (x: E) => F,
  fn6: (x: F) => R,
): (...a: A) => R;

export function pipe<A extends unknown[], B, C, D, E, F, G, R>(
  fn1: (...x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => E,
  fn5: (x: E) => F,
  fn6: (x: F) => G,
  fn7: (x: G) => R,
): (...a: A) => R;

export function pipe<A extends unknown[], B, C, D, E, F, G, H, R>(
  fn1: (...x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => E,
  fn5: (x: E) => F,
  fn6: (x: F) => G,
  fn7: (x: G) => H,
  fn8: (x: H) => R,
): (...a: A) => R;

export function pipe<A extends unknown[], B, C, D, E, F, G, H, I, R>(
  fn1: (...x: A) => B,
  fn2: (x: B) => C,
  fn3: (x: C) => D,
  fn4: (x: D) => E,
  fn5: (x: E) => F,
  fn6: (x: F) => G,
  fn7: (x: G) => H,
  fn8: (x: H) => I,
  fn9: (x: I) => R,
): (...a: A) => R;

export function pipe(...fns: AnyFn[]): (...x: unknown[]) => unknown {
  return (...x: unknown[]): unknown => {
    const initial: unknown = fns[0]!(...x);
    return fns.slice(1).reduce<unknown>((y, f) => f(y as never), initial);
  };
}
