import { columnify } from './columnify';

describe('toChunksParallel', () => {
  it('should create empty chunks when passing an empty array', () => {
    const result = columnify(2)([]);
    expect(result).toEqual([[], []]);
  });
  it('should create 1 chunk when passing a negative or zero', () => {
    const result1 = columnify(-1)(['a']);
    const result2 = columnify(0)(['a'] as const);
    expect(result1).toEqual([['a']]);
    expect(result2).toEqual([['a']]);
  });
  it('should create empty chunks when the number of chunks is greather than the number of the items', () => {
    const result = columnify(4)(['a', 'b', 'c'] as const);
    expect(result).toEqual([['a'], ['b'], ['c'], []]);
  });
  it('should distribute the items across the chunks properly', () => {
    const result = columnify(3)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const);
    expect(result).toEqual([
      [1, 4, 7, 10],
      [2, 5, 8],
      [3, 6, 9],
    ]);
  });
});
