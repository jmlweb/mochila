import { slice } from './slice';

describe('slice', () => {
  it('should slice an array', () => {
    const arr = [1, 2, 3, 4, 5] as const;
    const result = slice(1, 3)(arr);
    expect(result).toEqual([2, 3]);
  });
});
