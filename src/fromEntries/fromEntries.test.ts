import { fromEntries } from './fromEntries';

describe('fromEntries', () => {
  test('converts entries to object', () => {
    const entries: Array<[string, number]> = [
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ];
    const result = fromEntries(entries);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('handles empty entries', () => {
    const result = fromEntries([]);

    expect(result).toEqual({});
  });

  test('handles single entry', () => {
    const result = fromEntries([['a', 1]]);

    expect(result).toEqual({ a: 1 });
  });

  test('handles string values', () => {
    const entries: Array<[string, string]> = [
      ['name', 'Alice'],
      ['city', 'NY'],
    ];
    const result = fromEntries(entries);

    expect(result).toEqual({ name: 'Alice', city: 'NY' });
  });

  test('handles mixed value types', () => {
    const entries: Array<[string, unknown]> = [
      ['str', 'hello'],
      ['num', 42],
      ['bool', true],
      ['nil', null],
      ['arr', [1, 2, 3]],
    ];
    const result = fromEntries(entries);

    expect(result).toEqual({
      str: 'hello',
      num: 42,
      bool: true,
      nil: null,
      arr: [1, 2, 3],
    });
  });

  test('overwrites duplicate keys with last value', () => {
    const entries: Array<[string, number]> = [
      ['a', 1],
      ['a', 2],
      ['a', 3],
    ];
    const result = fromEntries(entries);

    expect(result).toEqual({ a: 3 });
  });

  test('handles object values', () => {
    const obj1 = { id: 1 };
    const entries: Array<[string, Record<string, unknown>]> = [
      ['user', obj1],
      ['config', { theme: 'dark' }],
    ];
    const result = fromEntries(entries);

    expect(result.user).toBe(obj1);
    expect(result.config).toEqual({ theme: 'dark' });
  });

  test('handles numeric string keys', () => {
    const entries: Array<[string, string]> = [
      ['1', 'a'],
      ['2', 'b'],
      ['10', 'c'],
    ];
    const result = fromEntries(entries);

    expect(result).toEqual({ '1': 'a', '2': 'b', '10': 'c' });
  });

  test('works with undefined values', () => {
    const entries: Array<[string, unknown]> = [
      ['a', undefined],
      ['b', 2],
    ];
    const result = fromEntries(entries);

    expect(result).toEqual({ a: undefined, b: 2 });
  });

  test('can compose with entries', () => {
    interface User {
      name: string;
      age: number;
    }

    const user: User = { name: 'Alice', age: 30 };
    const ent = Object.entries(user);
    const result = fromEntries(ent);

    expect(result).toEqual(user);
  });
});
