import { maxItem } from './maxItem';

describe('maxItem', () => {
  it('should return the maximum number from an array of numbers', () => {
    const numbers = [1, 5, 3, 9, 2];
    const result = maxItem(numbers);
    expect(result).toBe(9);
  });

  it('should return the maximum string from an array of strings', () => {
    const strings = ['apple', 'banana', 'durian', 'cherry'];
    const result = maxItem(strings);
    expect(result).toBe('durian');
  });

  it('should return undefined for an empty array', () => {
    const emptyArray: number[] = [];
    const result = maxItem(emptyArray);
    expect(result).toBeUndefined();
  });
});
