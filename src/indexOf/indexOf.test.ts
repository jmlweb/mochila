import { indexOf } from './indexOf';

describe('indexOf', () => {
  it('should return the index of the first occurrence of the value in the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const findIndex = indexOf(3)(arr);
    expect(findIndex).toBe(2);
  });

  it('should return -1 if the value is not found in the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const findIndex = indexOf(6)(arr);
    expect(findIndex).toBe(-1);
  });

  it('should start searching from the specified index if fromIndex is provided', () => {
    const arr = [1, 2, 3, 4, 2, 5];
    const findIndex = indexOf(2, 2)(arr);
    expect(findIndex).toBe(4);
  });

  it('should return -1 if fromIndex is greater than or equal to the length of the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const findIndex = indexOf(2, 5)(arr);
    expect(findIndex).toBe(-1);
  });

  it('should work with negative fromIndex', () => {
    const arr = [1, 2, 3, 4, 5];
    const findIndex = indexOf(4, -2)(arr);
    expect(findIndex).toBe(3);
  });
});
