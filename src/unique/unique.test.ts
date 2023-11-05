import { unique } from './unique';

describe('unique', () => {
  it('should return an empty array when given an empty array', () => {
    const input: number[] = [];
    const output = unique(input);
    expect(output).toEqual([]);
  });

  it('should return an array with the same elements when given an array with no duplicates', () => {
    const input = [1, 2, 3, 4, 5];
    const output = unique(input);
    expect(output).toEqual(input);
  });

  it('should return an array with duplicates removed when given an array with duplicates', () => {
    const input = [1, 2, 3, 2, 4, 5, 1];
    const output = unique(input);
    expect(output).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an array with objects with duplicates removed when given an array with duplicates', () => {
    const ids = [0, 1, 2, 3, 4, 5].map((v) => ({ id: v }));
    const input = [ids[1], ids[2], ids[3], ids[2], ids[4], ids[5], ids[1]];
    const output = unique(input);
    expect(output).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ]);
  });
});
