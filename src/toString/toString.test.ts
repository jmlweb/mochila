import { toString } from './toString';

describe('toString', () => {
  it('should work with numbers', () => {
    const result = toString(1).toLowerCase();
    expect(result).toBe('1');
  });
  it('should work with booleans', () => {
    const result = toString(true).toLowerCase();
    expect(result).toBe('true');
  });
  it('should work with strings', () => {
    const result = toString('hello').toLowerCase();
    expect(result).toBe('hello');
  });
});
