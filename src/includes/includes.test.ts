import { includes } from './includes';

describe('includes', () => {
  it('should return true if the value is included in the source array', () => {
    const source = [1, 2, 3, 4, 5];
    const value = 3;
    const result = includes(value)(source);
    expect(result).toBe(true);
  });

  it('should return false if the value is not included in the source array', () => {
    const source = ['apple', 'banana', 'orange'];
    const value = 'grape';
    const result = includes(value)(source);
    expect(result).toBe(false);
  });

  it('should return true if the value is included in the source string', () => {
    const source = 'Hello, world!';
    const value = 'world';
    const result = includes(value)(source);
    expect(result).toBe(true);
  });

  it('should return false if the value is not included in the source string', () => {
    const source = 'Hello, world!';
    const value = 'goodbye';
    const result = includes(value)(source);
    expect(result).toBe(false);
  });
});
