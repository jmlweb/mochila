import { memoize } from './memoize';

describe('memoize', () => {
  test('caches function results', () => {
    let callCount = 0;
    const fn = (a: number, b: number): number => {
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
    const fn = (a: number, b: number): number => {
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
    const fn = (x: number): number => {
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
    const fn = (): number => {
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
    const fn = (str: string): string => {
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
    const fn = (obj: Record<string, unknown>): string => {
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
    const fn = (str: string, num: number, bool: boolean): string => {
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
    const fn = (x: string): string => `[${x}]`;
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
    const fn = (arr: number[]): number => {
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
    const fn1 = (x: number): number => {
      count1 += 1;
      return x * 2;
    };
    const fn2 = (x: number): number => {
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

  describe('cache key', () => {
    const describeArg = jest.fn((x?: unknown, ..._rest: unknown[]): string => {
      if (x === undefined) return 'undefined';
      if (typeof x === 'bigint') return `bigint:${x}`;
      if (typeof x === 'function') return 'function';
      if (typeof x === 'symbol') return 'symbol';
      return `${typeof x}:${String(x)}`;
    });

    afterEach(() => {
      describeArg.mockClear();
    });

    test('keeps undefined and null apart in one instance', () => {
      const memoized = memoize(describeArg);
      const results: string[] = [memoized(null), memoized(undefined)];

      expect(results).toEqual(['object:null', 'undefined']);
      expect(describeArg).toHaveBeenCalledTimes(2);
    });

    test('keeps NaN, Infinity, -Infinity and null apart', () => {
      const memoized = memoize(describeArg);
      const inputs = [NaN, Infinity, -Infinity, null];

      expect(inputs.map((x) => memoized(x))).toEqual([
        'number:NaN',
        'number:Infinity',
        'number:-Infinity',
        'object:null',
      ]);
      expect(describeArg).toHaveBeenCalledTimes(4);
    });

    test('still caches each of those values on repeat calls', () => {
      const memoized = memoize(describeArg);
      [undefined, NaN, Infinity, -Infinity, null].forEach((x) => {
        memoized(x);
        memoized(x);
      });

      expect(describeArg).toHaveBeenCalledTimes(5);
    });

    test('keeps undefined apart from null inside arrays and objects', () => {
      const fn = jest.fn((x: unknown[]) => x.length);
      const memoized = memoize(fn);

      memoized([undefined]);
      memoized([null]);
      memoized({ a: undefined } as never);
      memoized({} as never);

      expect(fn).toHaveBeenCalledTimes(4);
    });

    test('distinguishes functions by identity', () => {
      const first = (): number => 1;
      const second = (): number => 1;
      const memoized = memoize(describeArg);

      memoized(first);
      memoized(second);
      memoized(first);
      memoized(null);

      expect(describeArg).toHaveBeenCalledTimes(3);
    });

    test('distinguishes symbols by identity', () => {
      const a = Symbol('same');
      const b = Symbol('same');
      const memoized = memoize(describeArg);

      memoized(a);
      memoized(b);
      memoized(a);
      memoized(null);

      expect(describeArg).toHaveBeenCalledTimes(3);
    });

    test('supports BigInt and keeps it apart from number and string', () => {
      const memoized = memoize(describeArg);

      expect(memoized(1n)).toBe('bigint:1');
      expect(memoized(2n)).toBe('bigint:2');
      expect(memoized(1)).toBe('number:1');
      expect(memoized('1')).toBe('string:1');
      expect(memoized(1n)).toBe('bigint:1');
      expect(describeArg).toHaveBeenCalledTimes(4);
    });

    test('still throws for circular arguments', () => {
      const circular: Record<string, unknown> = {};
      circular['self'] = circular;
      const memoized = memoize(describeArg);

      expect(() => memoized(circular)).toThrow(TypeError);
      expect(describeArg).not.toHaveBeenCalled();
    });

    test('keeps structural keys for objects, arrays and mixed args', () => {
      const memoized = memoize(describeArg);

      memoized({ a: 1, b: [1, 2] });
      memoized({ a: 1, b: [1, 2] });
      memoized([1, { c: 'x' }], 'y', 3);
      memoized([1, { c: 'x' }], 'y', 3);

      expect(describeArg).toHaveBeenCalledTimes(2);
    });

    test('treats equal dates as one key and -0 as 0, as before', () => {
      const memoized = memoize(describeArg);

      memoized(new Date(0));
      memoized(new Date(0));
      memoized(0);
      memoized(-0);

      expect(describeArg).toHaveBeenCalledTimes(2);
    });

    test('keeps the memoized function type', () => {
      const memoized: (x?: unknown) => string = memoize(describeArg);

      expect(memoized(undefined)).toBe('undefined');
    });
  });
});
