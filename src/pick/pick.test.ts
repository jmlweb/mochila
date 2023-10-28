import { pick } from './pick';

describe('pick', () => {
  it('should work with only strings', () => {
    const source = {
      b: 2,
      a: 1,
      '3': 'c',
    };
    const result = pick(['a', '3'])(source);
    const expected = {
      a: 1,
      '3': 'c',
    };
    expect(result).toEqual(expected);
  });
  it('should work with only numbers', () => {
    const source = {
      1: 2,
      2: 1,
      3: 'c',
    };
    const result = pick([3])(source);
    const expected = {
      3: 'c',
    };
    expect(result).toEqual(expected);
  });
  it('should work when retrieving a non existing value', () => {
    const source: Record<string, number> = {
      a: 2,
      b: 1,
    };
    const result = pick(['c'])(source);
    const expected = {};
    expect(result).toEqual(expected);
  });
});
