import { flatten } from './flatten';

describe('flatten', () => {
  it('should return an empty array if the source array is empty', () => {
    const source: number[] = [];
    const result = flatten(source);
    expect(result).toEqual([]);
  });

  it('should return the same array if the source array is already flat', () => {
    const source = [1, 2, 3, 4] as const;
    const result = flatten(source);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should flatten a nested array', () => {
    const source = [1, [2, [3, 4], 5], 6] as const;
    const result = flatten(source);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should flatten a deeply nested array', () => {
    const source = [1, [2, [3, [4, [5, 6]]]]] as const;
    const result = flatten(source);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should flatten a deeply nested array with empty arrays', () => {
    const source = [1, [2, [3, [4, [5, 6]]]], []] as const;
    const result = flatten(source);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
