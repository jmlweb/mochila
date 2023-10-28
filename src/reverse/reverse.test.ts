import { reverse } from './reverse';

describe('reverse', () => {
  const arr = [1, 2, 3] as const;
  it('should reverse an array', () => {
    const result = reverse(arr);
    expect(result).toEqual([3, 2, 1]);
  });
  it('should generate a new reference', () => {
    const result = reverse(arr);
    expect(result).not.toBe(arr);
  });
});
