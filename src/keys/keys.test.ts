import { keys } from './keys';

describe('keys', () => {
  it('should work with only strings', () => {
    const source = {
      b: 2,
      a: 1,
      '3': 'c',
    };
    const result = keys(source);
    const expected = ['3', 'b', 'a'];
    expect(result).toEqual(expected);
  });
  it('should work for numbers', () => {
    const source = {
      b: 2,
      a: 1,
      3: 'c',
    };
    const result = keys(source);
    const expected = ['3', 'b', 'a'];
    expect(result).toEqual(expected);
  });

  it('should work with widened types', () => {
    const source: Record<string | number, string | number> = {
      3: 'c',
      b: 2,
      a: 1,
    };
    const result = keys(source);
    const expected = ['3', 'b', 'a'];
    expect(result).toEqual(expected);
  });
  it('should work with as const', () => {
    const source = {
      3: 'c',
      a: 1,
      b: 2,
    } as const;
    const result = keys(source);
    const expected = ['3', 'a', 'b'];
    expect(result).toEqual(expected);
  });
});
