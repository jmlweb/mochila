import { difference } from './difference';

describe('difference', () => {
  test('returns elements not in exclude array', () => {
    const result = difference([2, 3])([1, 2, 3, 4]);
    expect(result).toEqual([1, 4]);
  });

  test('handles empty exclude array', () => {
    const result = difference<number>([])([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  test('returns empty array when all elements are excluded', () => {
    const result = difference([1, 2, 3])([1, 2, 3]);
    expect(result).toEqual([]);
  });

  test('preserves order from source array', () => {
    const result = difference([4, 1])([4, 3, 2, 1]);
    expect(result).toEqual([3, 2]);
  });

  test('handles duplicates in source by removing them', () => {
    const result = difference([2])([1, 1, 2, 2, 3]);
    expect(result).toEqual([1, 3]);
  });

  test('works with string arrays', () => {
    const result = difference(['b', 'c'])(['a', 'b', 'c', 'd']);
    expect(result).toEqual(['a', 'd']);
  });

  test('works with objects using reference equality', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const result = difference([obj1])([obj1, obj2, obj3]);
    expect(result).toEqual([obj2, obj3]);
  });

  test('handles empty source array', () => {
    const result = difference<number>([1, 2, 3])([]);
    expect(result).toEqual([]);
  });

  test('no elements excluded', () => {
    const result = difference<number>([])([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  test('both arrays empty', () => {
    const result = difference<number>([])([]);
    expect(result).toEqual([]);
  });

  test('handles large arrays efficiently', () => {
    const large = Array.from({ length: 1000 }, (_, i) => i);
    const exclude = Array.from({ length: 500 }, (_, i) => i);
    const result = difference(exclude)(large);
    expect(result.length).toBe(500);
    expect(result[0]).toBe(500);
  });
});
