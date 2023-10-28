import { deleteAt } from './deleteAt';

describe('deleteAt', () => {
  it('should delete an element at a given position', () => {
    const result = deleteAt(1)([1, 2, 3, 4, 5] as const);
    expect(result).toEqual([1, 3, 4, 5]);
  });
  it('should work with negative offsets', () => {
    const result = deleteAt(-1)([1, 2, 3, 4, 5] as const);
    expect(result).toEqual([1, 2, 3, 4]);
  });
  it('should work with zero', () => {
    const result = deleteAt(0)([1, 2, 3, 4, 5] as const);
    expect(result).toEqual([2, 3, 4, 5]);
  });
  it('should do nothing when attempting to reach out of bounds', () => {
    const result = deleteAt(5)([1, 2, 3, 4, 5] as const);
    const resultM = deleteAt(-15)([1, 2, 3, 4, 5] as const);
    expect(result).toEqual([1, 2, 3, 4, 5]);
    expect(resultM).toEqual([1, 2, 3, 4, 5]);
  });
  it('should work with a single element tuple', () => {
    const result = deleteAt(0)([1] as const);
    expect(result).toEqual([]);
  });
  it('should work with an empty tuple', () => {
    const result = deleteAt(0)([] as const);
    expect(result).toEqual([]);
  });
});
