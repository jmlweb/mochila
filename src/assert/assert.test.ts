import {
  assertIsArray,
  assertIsBoolean,
  assertIsDate,
  assertIsFunction,
  assertIsNonEmptyArray,
  assertIsNonNullable,
  assertIsNullable,
  assertIsNumber,
  assertIsObject,
  assertIsPlainObject,
  assertIsString,
  assertIsTupleable,
} from './index';

describe('assertIsArray', () => {
  test('must throw for non-arrays', () => {
    expect(() => assertIsArray(null)).toThrow('Expected an array');
    expect(() => assertIsArray(undefined)).toThrow('Expected an array');
    expect(() => assertIsArray({})).toThrow('Expected an array');
    expect(() => assertIsArray('array')).toThrow('Expected an array');
    expect(() => assertIsArray(123)).toThrow('Expected an array');
    expect(() => assertIsArray(true)).toThrow('Expected an array');
  });

  test('must not throw for arrays', () => {
    expect(() => assertIsArray([])).not.toThrow();
    expect(() => assertIsArray([1, 2, 3])).not.toThrow();
    expect(() => assertIsArray(['a', 'b'])).not.toThrow();
    expect(() => assertIsArray([{}])).not.toThrow();
  });

  test('must narrow type to Array<unknown>', () => {
    const x: unknown = [1, 2, 3];
    assertIsArray(x);
    const result: Array<unknown> = x;
    expect(result).toEqual([1, 2, 3]);
  });
});

describe('assertIsBoolean', () => {
  test('must throw for non-booleans', () => {
    expect(() => assertIsBoolean(null)).toThrow('Expected a boolean');
    expect(() => assertIsBoolean(undefined)).toThrow('Expected a boolean');
    expect(() => assertIsBoolean(0)).toThrow('Expected a boolean');
    expect(() => assertIsBoolean(1)).toThrow('Expected a boolean');
    expect(() => assertIsBoolean('true')).toThrow('Expected a boolean');
    expect(() => assertIsBoolean({})).toThrow('Expected a boolean');
  });

  test('must not throw for booleans', () => {
    expect(() => assertIsBoolean(true)).not.toThrow();
    expect(() => assertIsBoolean(false)).not.toThrow();
  });

  test('must narrow type to boolean', () => {
    const x: unknown = true;
    assertIsBoolean(x);
    const result: boolean = x;
    expect(result).toBe(true);
  });
});

describe('assertIsDate', () => {
  test('must throw for non-Date objects', () => {
    expect(() => assertIsDate(null)).toThrow('Expected a date');
    expect(() => assertIsDate(undefined)).toThrow('Expected a date');
    expect(() => assertIsDate('2024-01-01')).toThrow('Expected a date');
    expect(() => assertIsDate(1704067200000)).toThrow('Expected a date');
    expect(() => assertIsDate({})).toThrow('Expected a date');
  });

  test('must not throw for Date objects', () => {
    expect(() => assertIsDate(new Date())).not.toThrow();
    expect(() => assertIsDate(new Date('2024-01-01'))).not.toThrow();
  });

  test('must narrow type to Date', () => {
    const x: unknown = new Date();
    assertIsDate(x);
    const result: Date = x;
    expect(result instanceof Date).toBe(true);
  });
});

describe('assertIsFunction', () => {
  test('must throw for non-functions', () => {
    expect(() => assertIsFunction(null)).toThrow('Expected a function');
    expect(() => assertIsFunction(undefined)).toThrow('Expected a function');
    expect(() => assertIsFunction(123)).toThrow('Expected a function');
    expect(() => assertIsFunction('fn')).toThrow('Expected a function');
    expect(() => assertIsFunction({})).toThrow('Expected a function');
  });

  test('must not throw for functions', () => {
    expect(() => assertIsFunction(() => {})).not.toThrow();
    expect(() => assertIsFunction(function () {})).not.toThrow();
    expect(() => assertIsFunction(Math.random)).not.toThrow();
  });

  test('must narrow type to function', () => {
    const x: unknown = () => 42;
    assertIsFunction(x);
    const result: (...args: unknown[]) => unknown = x;
    expect(typeof result).toBe('function');
  });
});

describe('assertIsNonEmptyArray', () => {
  test('must throw for empty arrays', () => {
    expect(() => assertIsNonEmptyArray([])).toThrow(
      'Expected a non-empty array',
    );
  });

  test('must not throw for non-empty arrays', () => {
    expect(() => assertIsNonEmptyArray([1])).not.toThrow();
    expect(() => assertIsNonEmptyArray([1, 2, 3])).not.toThrow();
    expect(() => assertIsNonEmptyArray(['a'])).not.toThrow();
  });

  test('must narrow type to NonEmptyArray', () => {
    const x: readonly number[] = [1, 2, 3];
    assertIsNonEmptyArray(x);
    const result = x;
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toBeDefined();
  });
});

describe('assertIsNonNullable', () => {
  test('must throw for null and undefined', () => {
    expect(() => assertIsNonNullable(null)).toThrow(
      'Expected a non-nullable value',
    );
    expect(() => assertIsNonNullable(undefined)).toThrow(
      'Expected a non-nullable value',
    );
  });

  test('must not throw for non-nullable values', () => {
    expect(() => assertIsNonNullable(0)).not.toThrow();
    expect(() => assertIsNonNullable('')).not.toThrow();
    expect(() => assertIsNonNullable(false)).not.toThrow();
    expect(() => assertIsNonNullable({})).not.toThrow();
    expect(() => assertIsNonNullable([])).not.toThrow();
  });

  test('must narrow type from nullable to non-nullable', () => {
    const x: number | null | undefined = 42;
    assertIsNonNullable(x);
    const result: number = x;
    expect(result).toBe(42);
  });
});

describe('assertIsNullable', () => {
  test('must throw for non-nullable values', () => {
    expect(() => assertIsNullable(0)).toThrow('Expected a non-nullable value');
    expect(() => assertIsNullable('')).toThrow('Expected a non-nullable value');
    expect(() => assertIsNullable(false)).toThrow(
      'Expected a non-nullable value',
    );
    expect(() => assertIsNullable({})).toThrow('Expected a non-nullable value');
    expect(() => assertIsNullable([])).toThrow('Expected a non-nullable value');
  });

  test('must not throw for null and undefined', () => {
    expect(() => assertIsNullable(null)).not.toThrow();
    expect(() => assertIsNullable(undefined)).not.toThrow();
  });

  test('must narrow type to nullable', () => {
    const x: number | null | undefined = null;
    assertIsNullable(x);
    const result: null | undefined = x;
    expect(result).toBeNull();
  });
});

describe('assertIsNumber', () => {
  test('must throw for non-numbers', () => {
    expect(() => assertIsNumber(null)).toThrow('Expected a number');
    expect(() => assertIsNumber(undefined)).toThrow('Expected a number');
    expect(() => assertIsNumber('123')).toThrow('Expected a number');
    expect(() => assertIsNumber(true)).toThrow('Expected a number');
    expect(() => assertIsNumber({})).toThrow('Expected a number');
  });

  test('must not throw for numbers', () => {
    expect(() => assertIsNumber(0)).not.toThrow();
    expect(() => assertIsNumber(123)).not.toThrow();
    expect(() => assertIsNumber(-456)).not.toThrow();
    expect(() => assertIsNumber(3.14)).not.toThrow();
    expect(() => assertIsNumber(Infinity)).not.toThrow();
    expect(() => assertIsNumber(NaN)).not.toThrow();
  });

  test('must narrow type to number', () => {
    const x: unknown = 42;
    assertIsNumber(x);
    const result: number = x;
    expect(result).toBe(42);
  });
});

describe('assertIsObject', () => {
  test('must throw for non-objects', () => {
    expect(() => assertIsObject(null)).toThrow('Expected an object');
    expect(() => assertIsObject(undefined)).toThrow('Expected an object');
    expect(() => assertIsObject(123)).toThrow('Expected an object');
    expect(() => assertIsObject('string')).toThrow('Expected an object');
    expect(() => assertIsObject(true)).toThrow('Expected an object');
  });

  test('must not throw for objects', () => {
    expect(() => assertIsObject({})).not.toThrow();
    expect(() => assertIsObject({ a: 1 })).not.toThrow();
    expect(() => assertIsObject([])).not.toThrow();
    expect(() => assertIsObject(new Date())).not.toThrow();
  });

  test('must narrow type to object', () => {
    const x: unknown = { foo: 'bar' };
    assertIsObject(x);
    const result: object = x;
    expect(result).toEqual({ foo: 'bar' });
  });
});

describe('assertIsPlainObject', () => {
  test('must throw for non-plain objects', () => {
    expect(() => assertIsPlainObject(null)).toThrow('Expected a plain object');
    expect(() => assertIsPlainObject(undefined)).toThrow(
      'Expected a plain object',
    );
    expect(() => assertIsPlainObject(123)).toThrow('Expected a plain object');
    expect(() => assertIsPlainObject('string')).toThrow(
      'Expected a plain object',
    );
    expect(() => assertIsPlainObject([])).toThrow('Expected a plain object');
    expect(() => assertIsPlainObject(new Date())).toThrow(
      'Expected a plain object',
    );
  });

  test('must not throw for plain objects', () => {
    expect(() => assertIsPlainObject({})).not.toThrow();
    expect(() => assertIsPlainObject({ a: 1 })).not.toThrow();
    expect(() => assertIsPlainObject({ nested: { obj: true } })).not.toThrow();
  });

  test('must narrow type to plain object', () => {
    const x: unknown = { foo: 'bar' };
    assertIsPlainObject(x);
    const result = x;
    expect(result).toEqual({ foo: 'bar' });
  });
});

describe('assertIsString', () => {
  test('must throw for non-strings', () => {
    expect(() => assertIsString(null)).toThrow('Expected a string');
    expect(() => assertIsString(undefined)).toThrow('Expected a string');
    expect(() => assertIsString(123)).toThrow('Expected a string');
    expect(() => assertIsString(true)).toThrow('Expected a string');
    expect(() => assertIsString({})).toThrow('Expected a string');
  });

  test('must not throw for strings', () => {
    expect(() => assertIsString('')).not.toThrow();
    expect(() => assertIsString('hello')).not.toThrow();
    expect(() => assertIsString('123')).not.toThrow();
  });

  test('must narrow type to string', () => {
    const x: unknown = 'test';
    assertIsString(x);
    const result: string = x;
    expect(result).toBe('test');
  });
});

describe('assertIsTupleable', () => {
  test('must throw for arrays with length < 2', () => {
    expect(() => assertIsTupleable([])).toThrow('Expected a tupeable');
    expect(() => assertIsTupleable([1])).toThrow('Expected a tupeable');
  });

  test('must not throw for arrays with length >= 2', () => {
    expect(() => assertIsTupleable([1, 2])).not.toThrow();
    expect(() => assertIsTupleable([1, 2, 3])).not.toThrow();
    expect(() => assertIsTupleable(['a', 'b'])).not.toThrow();
  });

  test('must narrow type to Tupleable', () => {
    const x: readonly unknown[] = [1, 2, 3];
    assertIsTupleable(x);
    const result = x;
    expect(result.length).toBeGreaterThanOrEqual(2);
  });
});
