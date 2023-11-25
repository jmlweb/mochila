import { findLast } from './findLast';

describe('findLast', () => {
  const isEven = (num: number) => num % 2 === 0;

  it('should return the last element that satisfies the predicate', () => {
    const numbers = [1, 2, 3, 4, 5];

    const result = findLast(isEven)(numbers);
    expect(result).toBe(4);
  });

  it('should return undefined if no element satisfies the predicate', () => {
    const numbers = [1, 3, 5];

    const result = findLast(isEven)(numbers);
    expect(result).toBeUndefined();
  });
});
