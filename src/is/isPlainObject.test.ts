import { isPlainObject } from './isPlainObject';

describe('isPlainObject', () => {
  it('should return true for plain object', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
  });
  it('should return false for non-plain object', () => {
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject('a')).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(1)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
  });
});
