import { firstItem } from './firstItem';

describe('firstItem', () => {
  it('should return the first item of an array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = firstItem(array);
    expect(result).toBe(1);
  });

  it('should return undefined if the array is empty', () => {
    const array: number[] = [];
    const result = firstItem(array);
    expect(result).toBeUndefined();
  });
});
