import { uniqueRight } from './uniqueRight';

describe('uniqueRight', () => {
  it('returns a new array with all duplicate values removed starting from the end of the input array', () => {
    const source = [1, 2, 3, 2, 1];
    const result = uniqueRight(source);
    expect(result).toEqual([3, 2, 1]);
    expect(result).not.toBe(source);
  });
  it('should work for empty arrays', () => {
    expect(uniqueRight([])).toEqual([]);
  });
});
