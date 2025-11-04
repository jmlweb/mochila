import { toString, toStringW } from './toString';

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

describe('toStringW', () => {
  it('should work with numbers', () => {
    const result = toStringW(1);
    expect(result).toBe('1');
  });
  it('should work with booleans', () => {
    const result = toStringW(true);
    expect(result).toBe('true');
  });
  it('should work with strings', () => {
    const result = toStringW('hello');
    expect(result).toBe('hello');
  });
  it('should work with null', () => {
    const result = toStringW(null);
    expect(result).toBe('null');
  });
  it('should work with undefined', () => {
    const result = toStringW(undefined);
    expect(result).toBe('undefined');
  });
  it('should work with objects', () => {
    const result = toStringW({ a: 1 });
    expect(result).toBe('[object Object]');
  });
  it('should work with arrays', () => {
    const result = toStringW([1, 2, 3]);
    expect(result).toBe('1,2,3');
  });
});
