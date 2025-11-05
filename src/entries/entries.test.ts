import { entries } from './entries';

describe('entries', () => {
  test('converts object to entries', () => {
    const result = entries({ a: 1, b: 2, c: 3 });

    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  test('handles empty object', () => {
    const result = entries({});

    expect(result).toEqual([]);
  });

  test('handles single property', () => {
    const result = entries({ a: 1 });

    expect(result).toEqual([['a', 1]]);
  });

  test('handles mixed value types', () => {
    const result = entries({ str: 'hello', num: 42, bool: true, nil: null });

    expect(result).toEqual([
      ['str', 'hello'],
      ['num', 42],
      ['bool', true],
      ['nil', null],
    ]);
  });

  test('handles objects with symbol keys (only string keys)', () => {
    const obj = { a: 1, b: 2 };
    Object.defineProperty(obj, Symbol.for('hidden'), { value: 'secret' });

    const result = entries(obj);

    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  test('handles array-like objects', () => {
    const obj = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    const result = entries(obj);

    expect(result).toEqual([
      ['0', 'a'],
      ['1', 'b'],
      ['2', 'c'],
      ['length', 3],
    ]);
  });

  test('does not include inherited properties', () => {
    const parent = { inherited: 'value' };
    const obj = Object.create(parent);
    obj.own = 'property';

    const result = entries(obj);

    expect(result).toEqual([['own', 'property']]);
  });

  test('preserves object values', () => {
    const nested = { x: 1 };
    const obj = { nested, arr: [1, 2, 3] };

    const result = entries(obj);

    expect(result[0]?.[1]).toBe(nested);
    expect(result[1]?.[1]).toEqual([1, 2, 3]);
  });

  test('handles numeric string keys', () => {
    const result = entries({ '1': 'a', '2': 'b', '10': 'c' });

    expect(result.length).toBe(3);
    expect(result).toContainEqual(['1', 'a']);
    expect(result).toContainEqual(['2', 'b']);
    expect(result).toContainEqual(['10', 'c']);
  });

  test('handles undefined values', () => {
    const result = entries({ a: undefined, b: 2 });

    expect(result).toEqual([
      ['a', undefined],
      ['b', 2],
    ]);
  });
});
