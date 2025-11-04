import { union } from './union';

describe('union', () => {
  test('combines arrays removing duplicates', () => {
    const result = union([3, 4])([1, 2, 3]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test('preserves order with source first', () => {
    const result = union([2, 1, 3])([3, 1, 2]);
    expect(result).toEqual([3, 1, 2]);
  });

  test('handles empty arrays', () => {
    expect(union([])([])).toEqual([]);
    expect(union([1, 2])([3, 4])).toEqual([3, 4, 1, 2]);
  });

  test('source array empty', () => {
    const result = union([1, 2, 3])([]);
    expect(result).toEqual([1, 2, 3]);
  });

  test('other array empty', () => {
    const result = union([])([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  test('handles duplicates in source', () => {
    const result = union([4])([1, 1, 2, 2, 3]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test('handles duplicates in other', () => {
    const result = union([3, 3, 4, 4])([1, 2]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test('works with string arrays', () => {
    const result = union(['c', 'd'])(['a', 'b', 'c']);
    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });

  test('works with objects using reference equality', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const result = union([obj3])([obj1, obj2]);
    expect(result).toEqual([obj1, obj2, obj3]);
  });

  test('all elements are common', () => {
    const result = union([1, 2, 3])([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  test('handles large arrays efficiently', () => {
    const source = Array.from({ length: 500 }, (_, i) => i);
    const other = Array.from({ length: 500 }, (_, i) => i + 250);
    const result = union(other)(source);
    expect(result.length).toBe(750);
    expect(result[0]).toBe(0);
    expect(result[749]).toBe(749);
  });
});
