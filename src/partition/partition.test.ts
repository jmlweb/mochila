import { partition } from './partition';

describe('partition', () => {
  it('should partition an array into a tuple where the first position are the items that pass the predicate and the second position are the items that fail the predicate', () => {
    const isEven = (n: number) => n % 2 === 0;
    const arr = [1, 2, 3, 4, 5];
    const [left, right] = partition(isEven)(arr);
    expect(left).toEqual([2, 4]);
    expect(right).toEqual([1, 3, 5]);
  });
  it('should create a tuple of empty arrays if the input array is empty', () => {
    const isEven = (n: number) => n % 2 === 0;
    const arr: number[] = [];
    const [left, right] = partition(isEven)(arr);
    expect(left).toEqual([]);
    expect(right).toEqual([]);
  });
  it('should create a tuple where the first position is an empty array if no items pass the predicate', () => {
    const isEven = (n: number) => n % 2 === 0;
    const arr = [1, 3, 5];
    const [left, right] = partition(isEven)(arr);
    expect(left).toEqual([]);
    expect(right).toEqual([1, 3, 5]);
  });
  it('should create a tuple where the second position is an empty array if no items fail the predicate', () => {
    const isEven = (n: number) => n % 2 === 0;
    const arr = [2, 4, 6];
    const [left, right] = partition(isEven)(arr);
    expect(left).toEqual([2, 4, 6]);
    expect(right).toEqual([]);
  });
});
