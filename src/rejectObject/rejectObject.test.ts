import { rejectObject } from './rejectObject';

describe('rejectObject', () => {
  test('rejects object by predicate', () => {
    const isEven = (x: unknown) =>
      typeof x === 'number' && (x as number) % 2 === 0;
    const result = rejectObject(isEven)({ a: 1, b: 2, c: 3, d: 4 });

    expect(result).toEqual({ a: 1, c: 3 });
  });

  test('rejects empty object', () => {
    const isEven = (x: unknown) =>
      typeof x === 'number' && (x as number) % 2 === 0;
    const result = rejectObject(isEven)({});

    expect(result).toEqual({});
  });

  test('rejects with all matching', () => {
    const isEven = (x: unknown) =>
      typeof x === 'number' && (x as number) % 2 === 0;
    const result = rejectObject(isEven)({ a: 2, b: 4, c: 6 });

    expect(result).toEqual({});
  });

  test('rejects with none matching', () => {
    const isEven = (x: unknown) =>
      typeof x === 'number' && (x as number) % 2 === 0;
    const result = rejectObject(isEven)({ a: 1, b: 3, c: 5 });

    expect(result).toEqual({ a: 1, b: 3, c: 5 });
  });

  test('rejects string values', () => {
    const isLong = (x: unknown) => typeof x === 'string' && x.length > 3;
    const result = rejectObject(isLong)({
      short: 'hi',
      medium: 'hello',
      long: 'goodbye',
    });

    expect(result).toEqual({ short: 'hi' });
  });

  test('rejects boolean values', () => {
    const isTruthy = (x: unknown) => x === true;
    const result = rejectObject(isTruthy)({ a: true, b: false, c: true });

    expect(result).toEqual({ b: false });
  });

  test('rejects objects', () => {
    const hasId = (x: unknown) =>
      typeof x === 'object' && x !== null && 'id' in x;
    const result = rejectObject(hasId)({
      user1: { id: 1, name: 'Alice' },
      user2: { name: 'Bob' },
      user3: { id: 3, name: 'Charlie' },
    });

    expect(result).toEqual({
      user2: { name: 'Bob' },
    });
  });

  test('preserves keys', () => {
    const isGreaterThan5 = (x: unknown) => typeof x === 'number' && x > 5;
    const result = rejectObject(isGreaterThan5)({
      a: 3,
      b: 7,
      c: 5,
      d: 10,
    });

    expect(Object.keys(result).sort()).toEqual(['a', 'c']);
  });

  test('does not mutate original', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const isEven = (x: unknown) =>
      typeof x === 'number' && (x as number) % 2 === 0;
    rejectObject(isEven)(obj);

    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('works with complex predicates', () => {
    const predicate = (x: unknown) =>
      typeof x === 'number' && (x as number) % 2 === 0 && x > 2;
    const result = rejectObject(predicate)({
      a: 1,
      b: 2,
      c: 4,
      d: 5,
      e: 6,
    });

    expect(result).toEqual({ a: 1, b: 2, d: 5 });
  });
});
