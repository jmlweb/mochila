import { chunkify } from './chunkify';

describe('chunkify', () => {
  it('should return empty array when source is empty', () => {
    const result = chunkify(2)([]);
    expect(result).toEqual([]);
  });

  it('should return array with one chunk when source length is less than chunk size', () => {
    const result = chunkify(2)([1] as const);
    expect(result).toEqual([[1]]);
  });

  it('should return array with one chunk when source length is equal to chunk size', () => {
    const result = chunkify(2)([1, 2] as const);
    expect(result).toEqual([[1, 2]]);
  });

  it('should return array with two chunks when source length is greater than chunk size', () => {
    const result = chunkify(2)([1, 2, 3] as const);
    expect(result).toEqual([[1, 2], [3]]);
  });
  it('should return array with only one chunk when the chunk size is equal or less than 0', () => {
    const result = chunkify(0)([1, 2, 3] as const);
    expect(result).toEqual([[1, 2, 3]]);
    const result2 = chunkify(-1)([1, 2, 3] as const);
    expect(result2).toEqual([[1, 2, 3]]);
  });
});
