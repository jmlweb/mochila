import { memoize } from './memoize';

describe('memoize', () => {
  test('caches function results', () => {
    let callCount = 0;
    const fn = (a: number, b: number) => {
      callCount += 1;
      return a + b;
    };
    const memoized = memoize(fn);

    expect(memoized(2, 3)).toBe(5);
    expect(memoized(2, 3)).toBe(5);
    expect(callCount).toBe(1);
  });

  test('distinguishes different arguments', () => {
    let callCount = 0;
    const fn = (a: number, b: number) => {
      callCount += 1;
      return a + b;
    };
    const memoized = memoize(fn);

    expect(memoized(2, 3)).toBe(5);
    expect(memoized(3, 4)).toBe(7);
    expect(memoized(2, 3)).toBe(5);
    expect(callCount).toBe(2);
  });

  test('works with single argument', () => {
    let callCount = 0;
    const fn = (x: number) => {
      callCount += 1;
      return x * 2;
    };
    const memoized = memoize(fn);

    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
    expect(callCount).toBe(1);
  });

  test('works with no arguments', () => {
    let callCount = 0;
    const fn = () => {
      callCount += 1;
      return 42;
    };
    const memoized = memoize(fn);

    expect(memoized()).toBe(42);
    expect(memoized()).toBe(42);
    expect(callCount).toBe(1);
  });

  test('works with string arguments', () => {
    let callCount = 0;
    const fn = (str: string) => {
      callCount += 1;
      return str.toUpperCase();
    };
    const memoized = memoize(fn);

    expect(memoized('hello')).toBe('HELLO');
    expect(memoized('hello')).toBe('HELLO');
    expect(callCount).toBe(1);
  });

  test('works with object arguments', () => {
    let callCount = 0;
    const fn = (obj: Record<string, unknown>) => {
      callCount += 1;
      return JSON.stringify(obj);
    };
    const memoized = memoize(fn);

    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };

    expect(memoized(obj1)).toBe('{"a":1,"b":2}');
    expect(memoized(obj2)).toBe('{"a":1,"b":2}');
    expect(callCount).toBe(1);
  });

  test('works with multiple arguments of different types', () => {
    let callCount = 0;
    const fn = (str: string, num: number, bool: boolean) => {
      callCount += 1;
      return `${str}-${num}-${bool}`;
    };
    const memoized = memoize(fn);

    expect(memoized('test', 42, true)).toBe('test-42-true');
    expect(memoized('test', 42, true)).toBe('test-42-true');
    expect(callCount).toBe(1);

    expect(memoized('test', 42, false)).toBe('test-42-false');
    expect(callCount).toBe(2);
  });

  test('preserves function type', () => {
    const fn = (x: string) => `[${x}]`;
    const memoized = memoize(fn);

    expect(typeof memoized).toBe('function');
    expect(memoized('hello')).toBe('[hello]');
  });

  test('returns cached undefined values', () => {
    let callCount = 0;
    const fn = (): undefined => {
      callCount += 1;
      return undefined;
    };
    const memoized = memoize(fn);

    expect(memoized()).toBeUndefined();
    expect(memoized()).toBeUndefined();
    expect(callCount).toBe(1);
  });

  test('handles null values', () => {
    let callCount = 0;
    const fn = (): null => {
      callCount += 1;
      return null;
    };
    const memoized = memoize(fn);

    expect(memoized()).toBeNull();
    expect(memoized()).toBeNull();
    expect(callCount).toBe(1);
  });

  test('works with array arguments', () => {
    let callCount = 0;
    const fn = (arr: number[]) => {
      callCount += 1;
      return arr.reduce((a, b) => a + b, 0);
    };
    const memoized = memoize(fn);

    expect(memoized([1, 2, 3])).toBe(6);
    expect(memoized([1, 2, 3])).toBe(6);
    expect(callCount).toBe(1);

    expect(memoized([1, 2, 3, 4])).toBe(10);
    expect(callCount).toBe(2);
  });

  test('independent memoized instances', () => {
    let count1 = 0;
    let count2 = 0;
    const fn1 = (x: number) => {
      count1 += 1;
      return x * 2;
    };
    const fn2 = (x: number) => {
      count2 += 1;
      return x * 2;
    };
    const memoized1 = memoize(fn1);
    const memoized2 = memoize(fn2);

    expect(memoized1(5)).toBe(10);
    expect(memoized2(5)).toBe(10);
    expect(count1).toBe(1);
    expect(count2).toBe(1);
  });
});
