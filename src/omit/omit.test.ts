import { omit } from './omit';

describe('omit', () => {
  it('should work with only strings', () => {
    const source = {
      b: 2,
      a: 1,
      '3': 'c',
    } as const;
    const result = omit(['a', '3'])(source);
    const expected = {
      b: 2,
    };
    expect(result).toEqual(expected);
  });
  it('should work with only numbers', () => {
    const source = {
      1: 2,
      2: 1,
      3: 'c',
    };
    const result = omit([3])(source);
    const expected = {
      1: 2,
      2: 1,
    };
    expect(result).toEqual(expected);
  });
  it('should work when omitting a non-existing value', () => {
    const source: Record<string, number> = {
      b: 2,
      a: 1,
    };
    const result = omit(['c'])(source);
    const expected = {
      b: 2,
      a: 1,
    };
    expect(result).toEqual(expected);
  });
});
