import { isArray } from './isArray';

describe('isArray', () => {
  test('must return true for arrays', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(['a', 'b', 'c'])).toBe(true);
    expect(isArray([{}, {}, {}])).toBe(true);
    expect(isArray([[], [], []])).toBe(true);
  });

  test('must return false for non-arrays', () => {
    expect(isArray(0)).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(new Date())).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
  });
});
