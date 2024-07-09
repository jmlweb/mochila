import { append } from './append';

describe('append', () => {
  it('should append a value to a string', () => {
    const result = append('bar')('foo');
    expect(result).toBe('foobar');
  });
  it('should append a value to an array', () => {
    const result = append(3)([1, 2]);
    expect(result).toEqual([1, 2, 3]);
  });
  it('should append a value to a string array', () => {
    const result = append('bar')(['foo']);
    expect(result).toEqual(['foo', 'bar']);
  });
  it('should append a value to a mixed array', () => {
    const result = append(3)(['foo']);
    expect(result).toEqual(['foo', 3]);
  });
  it('should append a number to a string', () => {
    const result = append(3)('foo');
    expect(result).toBe('foo3');
  });
});
