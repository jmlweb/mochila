import { filterObject } from './filterObject';

describe('filterObject', () => {
  test('filters object by predicate', () => {
    const isEven = (x: unknown) => typeof x === 'number' && x % 2 === 0;
    const result = filterObject(isEven)({ a: 1, b: 2, c: 3, d: 4 });

    expect(result).toEqual({ b: 2, d: 4 });
  });

  test('filters empty object', () => {
    const isEven = (x: number) => x % 2 === 0;
    const result = filterObject(isEven)({});

    expect(result).toEqual({});
  });

  test('filters with all matching', () => {
    const isEven = (x: number) => x % 2 === 0;
    const result = filterObject(isEven)({ a: 2, b: 4, c: 6 });

    expect(result).toEqual({ a: 2, b: 4, c: 6 });
  });

  test('filters with none matching', () => {
    const isEven = (x: number) => x % 2 === 0;
    const result = filterObject(isEven)({ a: 1, b: 3, c: 5 });

    expect(result).toEqual({});
  });

  test('filters string values', () => {
    const isLong = (x: unknown) => typeof x === 'string' && x.length > 3;
    const result = filterObject(isLong)({
      short: 'hi',
      medium: 'hello',
      long: 'goodbye',
    });

    expect(result).toEqual({ medium: 'hello', long: 'goodbye' });
  });

  test('filters boolean values', () => {
    const isTruthy = (x: unknown) => x === true;
    const result = filterObject(isTruthy)({ a: true, b: false, c: true });

    expect(result).toEqual({ a: true, c: true });
  });

  test('filters objects', () => {
    const hasId = (x: Record<string, unknown>) => 'id' in x;
    const result = filterObject(hasId)({
      user1: { id: 1, name: 'Alice' },
      user2: { name: 'Bob' },
      user3: { id: 3, name: 'Charlie' },
    });

    expect(result).toEqual({
      user1: { id: 1, name: 'Alice' },
      user3: { id: 3, name: 'Charlie' },
    });
  });

  test('preserves keys', () => {
    const isGreaterThan5 = (x: number) => x > 5;
    const result = filterObject(isGreaterThan5)({
      a: 3,
      b: 7,
      c: 5,
      d: 10,
    });

    expect(Object.keys(result).sort()).toEqual(['b', 'd']);
  });

  test('does not mutate original', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const isEven = (x: number) => x % 2 === 0;
    filterObject(isEven)(obj);

    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('works with complex predicates', () => {
    const predicate = (x: unknown) =>
      typeof x === 'number' && x % 2 === 0 && x > 2;
    const result = filterObject(predicate)({
      a: 1,
      b: 2,
      c: 4,
      d: 5,
      e: 6,
    });

    expect(result).toEqual({ c: 4, e: 6 });
  });
});
