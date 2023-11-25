import { findIndex } from './findIndex';

describe('findIndex', () => {
  it('should return the index of the first element that satisfies the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const isEven = (num: number) => num % 2 === 0;
    const result = findIndex(isEven)(arr);
    expect(result).toBe(1); // The first even number is at index 1
  });

  it('should return -1 if no element satisfies the predicate', () => {
    const arr = [1, 3, 5, 7, 9];
    const isEven = (num: number) => num % 2 === 0;
    const result = findIndex(isEven)(arr);
    expect(result).toBe(-1); // No even number in the array
  });

  it('should return -1 for an empty array', () => {
    const arr: number[] = [];
    const isEven = (num: number) => num % 2 === 0;
    const result = findIndex(isEven)(arr);
    expect(result).toBe(-1); // Empty array, so no element satisfies the predicate
  });
});
