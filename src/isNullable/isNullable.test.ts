import { isNullable } from './isNullable';

describe('isNullable', () => {
  it('should return true if value is null', () => {
    expect(isNullable(null)).toBe(true);
  });

  it('should return true if value is undefined', () => {
    expect(isNullable(undefined)).toBe(true);
  });

  it('should return false otherwise', () => {
    expect(isNullable(0)).toBe(false);
    expect(isNullable(false)).toBe(false);
    expect(isNullable('')).toBe(false);
    expect(isNullable([])).toBe(false);
    expect(isNullable({})).toBe(false);
    expect(isNullable(() => null)).toBe(false);
  });
});
