import { sortWith } from './sortWith';

describe('sortWith', () => {
  it('should sort an array without a sorter function', () => {
    const source = [2, 3, 1];
    const result = sortWith()(source);
    expect(result).toEqual([1, 2, 3]);
  });
  it('should sort an array with a sorter function', () => {
    const source = [2, 3, 1];
    const result = sortWith((a: number, b) => b - a)(source);
    expect(result).toEqual([3, 2, 1]);
  });
  it('should work with an empty array', () => {
    const result = sortWith((a: number, b) => b - a)([]);
    expect(result).toEqual([]);
  });
});
