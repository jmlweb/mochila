import { isString } from './isString';

describe('isString', () => {
  test('must return true for strings', () => {
    expect(isString('')).toBe(true);
    expect(isString('a')).toBe(true);
    expect(isString('abc')).toBe(true);
  });

  test('must return false for non-strings', () => {
    expect(isString(0)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(new Date())).toBe(false);
    expect(isString(() => {})).toBe(false);
  });
});
