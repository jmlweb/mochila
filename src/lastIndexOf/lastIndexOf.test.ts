import { lastIndexOf } from './lastIndexOf';

describe('lastIndexOf', () => {
  it('should return the last index of the value in the array', () => {
    const arr = [1, 2, 3, 4, 2, 5];
    const findIndex = lastIndexOf(2);
    expect(findIndex(arr)).toBe(4);
  });

  it('should return -1 if the value is not found in the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const findIndex = lastIndexOf(6);
    expect(findIndex(arr)).toBe(-1);
  });

  it('should return the last index of the value in the array starting from the specified index', () => {
    const arr = [1, 2, 3, 4, 2, 5];
    const findIndex = lastIndexOf(2, 3);
    expect(findIndex(arr)).toBe(1);
  });

  it('should return -1 if the value is not found in the array starting from the specified index', () => {
    const arr = [1, 2, 3, 4, 5];
    const findIndex = lastIndexOf(2, 3);
    expect(findIndex(arr)).toBe(-1);
  });

  it('should return -1 for an empty array', () => {
    const emptyArray: number[] = [];
    const findIndex = lastIndexOf(2);
    expect(findIndex(emptyArray)).toBe(-1);
  });

  it('should work with negative forIndex', () => {
    const arr = [1, 2, 3, 4, 2, 5];
    const findIndex = lastIndexOf(2, -2);
    expect(findIndex(arr)).toBe(6);
  });
});
