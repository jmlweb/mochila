import { length } from './length';

describe('length', () => {
  it('should return the length of a string', () => {
    const str = 'Hello, World!';
    const result = length(str);
    expect(result).toBe(str.length);
  });

  it('should return the length of an array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = length(arr);
    expect(result).toBe(arr.length);
  });

  it('should return 0 for an empty string', () => {
    const str = '';
    const result = length(str);
    expect(result).toBe(0);
  });

  it('should return 0 for an empty array', () => {
    const arr: number[] = [];
    const result = length(arr);
    expect(result).toBe(0);
  });
});
