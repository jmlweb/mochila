import { intersection } from './intersection';

describe('intersection', () => {
  test('returns common elements', () => {
    const result = intersection([2, 3])([1, 2, 3, 4]);
    expect(result).toEqual([2, 3]);
  });

  test('handles empty arrays', () => {
    expect(intersection([])([])).toEqual([]);
    expect(intersection([1, 2])([3, 4])).toEqual([]);
  });

  test('returns empty array when source is empty', () => {
    expect(intersection([1, 2, 3])([])).toEqual([]);
  });

  test('preserves order from source array', () => {
    const result = intersection([3, 1, 2])([3, 2, 1]);
    expect(result).toEqual([3, 2, 1]);
  });

  test('handles duplicates in source by removing them', () => {
    const result = intersection([1, 2])([1, 1, 2, 2, 3]);
    expect(result).toEqual([1, 2]);
  });

  test('works with string arrays', () => {
    const result = intersection(['b', 'c'])(['a', 'b', 'c', 'd']);
    expect(result).toEqual(['b', 'c']);
  });

  test('works with objects using reference equality', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const result = intersection([obj1, obj2])([obj1, obj3, obj2]);
    expect(result).toEqual([obj1, obj2]);
  });

  test('single element intersection', () => {
    const result = intersection([2])([1, 2, 3]);
    expect(result).toEqual([2]);
  });

  test('all elements intersect', () => {
    const result = intersection([1, 2, 3])([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  test('handles large arrays efficiently', () => {
    const large = Array.from({ length: 1000 }, (_, i) => i);
    const small = [250, 500, 750];
    const result = intersection(small)(large);
    expect(result).toEqual([250, 500, 750]);
  });
});
