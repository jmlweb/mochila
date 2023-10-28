import { sort } from './sort';

describe('sort', () => {
  it('should sort an array without a sorter function', () => {
    const source = [2, 3, 1];
    const result = sort(source)();
    expect(result).toEqual([1, 2, 3]);
  });
  it('should sort an array with a sorter function', () => {
    const source = [2, 3, 1] as const;
    const result = sort(source)((a, b) => b - a);
    expect(result).toEqual([3, 2, 1]);
  });
  it('should work with different types', () => {
    const source = ['hello', 2, 'a', 'goodbye', 4, 'bye!'];
    const valueOrLength = (x: string | number) =>
      typeof x === 'string' ? x.length : x;
    const result = sort(source)((a, b) => valueOrLength(a) - valueOrLength(b));
    expect(result).toEqual(['a', 2, 4, 'bye!', 'hello', 'goodbye']);
  });
});
