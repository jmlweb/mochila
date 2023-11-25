import { findLastIndex } from './findLastIndex';

describe('findLastIndex', () => {
  it('should return the index of the last element that satisfies the predicate', () => {
    const arr = [1, 2, 3, 4, 5];

    // Test case 1: Find the last even number
    const isEven = (num: number) => num % 2 === 0;
    expect(findLastIndex(isEven)(arr)).toBe(3);

    // Test case 2: Find the last number greater than 3
    const isGreaterThanThree = (num: number) => num > 3;
    expect(findLastIndex(isGreaterThanThree)(arr)).toBe(4);
  });

  it('should return -1 if no element satisfies the predicate', () => {
    const arr = [1, 2, 3, 4, 5];

    // Test case: Find the last negative number
    const isNegative = (num: number) => num < 0;
    expect(findLastIndex(isNegative)(arr)).toBe(-1);
  });
});
