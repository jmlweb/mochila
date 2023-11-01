import { isString } from '../isString';
import { filter } from './filter';

describe('filter', () => {
  it('should filter out values that do not match the predicate', () => {
    const isEven = (x: number) => x % 2 === 0;
    const filterEven = filter(isEven);
    const result = filterEven([1, 2, 3, 4, 5, 6]);
    expect(result).toEqual([2, 4, 6]);
  });
  it('should filter out values that do not match the type guard', () => {
    const filterString = filter(isString);
    const result = filterString([1, 'a', 2, 'b', 3, 'c'] as const);
    expect(result).toEqual(['a', 'b', 'c']);
  });
  it('should work with empty arrays', () => {
    const filterString = filter(isString);
    const result = filterString([]);
    expect(result).toEqual([]);
  });
});
