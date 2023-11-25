import { lastItem } from './lastItem';

describe('lastItem', () => {
  it('should return the last item of an array', () => {
    const array1 = [1, 2, 3, 4, 5];
    expect(lastItem(array1)).toBe(5);

    const array2 = ['a', 'b', 'c'];
    expect(lastItem(array2)).toBe('c');
  });

  it('should return undefined for an empty array', () => {
    const emptyArray: number[] = [];
    expect(lastItem(emptyArray)).toBeUndefined();
  });

  it('should handle arrays with a single item', () => {
    const array = [42];
    expect(lastItem(array)).toBe(42);
  });
});
