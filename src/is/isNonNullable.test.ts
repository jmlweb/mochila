import { isNonNullable } from './isNonNullable';

describe('isNonNullable', () => {
  test('must return true for non-null values', () => {
    expect(isNonNullable(0)).toBe(true);
    expect(isNonNullable('')).toBe(true);
    expect(isNonNullable({})).toBe(true);
    expect(isNonNullable([])).toBe(true);
    expect(isNonNullable(new Date())).toBe(true);
    expect(isNonNullable(() => {})).toBe(true);
  });

  test('must return false for null', () => {
    expect(isNonNullable(null)).toBe(false);
  });
  test('must return false for undefined', () => {
    expect(isNonNullable(undefined)).toBe(false);
  });
});
