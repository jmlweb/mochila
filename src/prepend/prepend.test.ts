import { prepend } from './prepend';

describe('prepend', () => {
  it('should prepend a value to a string', () => {
    const result = prepend('bar')('foo');
    expect(result).toBe('barfoo');
  });
  it('should prepend a value to an array', () => {
    const result = prepend(3)([1, 2]);
    expect(result).toEqual([3, 1, 2]);
  });
  it('should prepend a value to a string array', () => {
    const result = prepend('bar')(['foo']);
    expect(result).toEqual(['bar', 'foo']);
  });
  it('should prepend a value to a mixed array', () => {
    const result = prepend(3)(['foo']);
    expect(result).toEqual([3, 'foo']);
  });
  it('should prepend a number to a string', () => {
    const result = prepend(3)('foo');
    expect(result).toBe('3foo');
  });
});
