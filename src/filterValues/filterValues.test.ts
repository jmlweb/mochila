import { filterValues } from './filterValues';

describe('filterValues', () => {
  it('should filter values', () => {
    const result = filterValues([1, 2, 3])([1, 2, 3, 4, 5] as const);
    expect(result).toEqual([1, 2, 3]);
  });
});
