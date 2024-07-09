import { flow } from './flow';

describe('flow', () => {
  it('should return the result of the first function', () => {
    const result = flow(1, (x) => x + 1);
    expect(result).toBe(2);
  });
  it('should return the result of the second function', () => {
    const result = flow(
      1,
      (x) => x + 1,
      (x) => x * 2,
    );
    expect(result).toBe(4);
  });
  it('should return the result of the third function', () => {
    const result = flow(
      1,
      (x) => x + 1,
      (x) => x * 2,
      (x) => x - 1,
    );
    expect(result).toBe(3);
  });
});
