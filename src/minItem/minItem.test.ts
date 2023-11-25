import { minItem } from './minItem';

describe('minItem', () => {
  it('should return undefined for an empty array', () => {
    const result = minItem([]);
    expect(result).toBeUndefined();
  });

  it('should return the minimum number from an array of numbers', () => {
    const result = minItem([5, 2, 8, 1, 10]);
    expect(result).toBe(1);
  });

  it('should return the string with the minimum lexicographical order from an array of strings', () => {
    const result = minItem(['apple', 'banana', 'cherry', 'pear']);
    expect(result).toBe('apple');
  });
});
