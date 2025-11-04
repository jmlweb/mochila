import { deepMerge } from './deepMerge';

describe('deepMerge', () => {
  test('merges simple objects', () => {
    const target = { a: 1, b: 2 };
    const source = { c: 3 };
    const result = deepMerge(source)(target);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('overwrites existing keys from source', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 20 };
    const result = deepMerge(source)(target);
    expect(result).toEqual({ a: 1, b: 20 });
  });

  test('recursively merges nested objects', () => {
    const target = { a: { b: 1, c: 2 } };
    const source = { a: { b: 10, d: 4 } };
    const result = deepMerge(source)(target);
    expect(result).toEqual({ a: { b: 10, c: 2, d: 4 } });
  });

  test('deeply nested objects merge correctly', () => {
    const target = { a: { b: { c: 1, d: 2 } } };
    const source = { a: { b: { c: 10, e: 5 } } };
    const result = deepMerge(source)(target);
    expect(result).toEqual({ a: { b: { c: 10, d: 2, e: 5 } } });
  });

  test('handles arrays by replacing them', () => {
    const target = { a: [1, 2, 3] };
    const source = { a: [4, 5] };
    const result = deepMerge(source)(target);
    expect(result).toEqual({ a: [4, 5] });
  });

  test('does not mutate original objects', () => {
    const target = { a: 1, b: { c: 2 } };
    const source = { b: { d: 3 } };
    const targetCopy = JSON.parse(JSON.stringify(target));
    deepMerge(source)(target);
    expect(target).toEqual(targetCopy);
  });

  test('handles null values', () => {
    const target = { a: 1, b: null };
    const source = { b: 2 };
    const result = deepMerge(source)(target);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  test('handles undefined values', () => {
    const target = { a: 1, b: undefined };
    const source = { b: 2 };
    const result = deepMerge(source)(target);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  test('handles empty objects', () => {
    const target = { a: 1 };
    const source: Record<string, unknown> = {};
    const result = deepMerge(source)(target);
    expect(result).toEqual({ a: 1 });
  });

  test('handles multiple levels of nesting with mixed types', () => {
    const target = {
      x: { y: { z: 1 }, arr: [1, 2] },
      str: 'hello',
    };
    const source = {
      x: { y: { w: 2 }, arr: [3, 4, 5] },
      num: 42,
    };
    const result = deepMerge(source)(target);
    expect(result).toEqual({
      x: { y: { z: 1, w: 2 }, arr: [3, 4, 5] },
      str: 'hello',
      num: 42,
    });
  });
});
