import { isBoolean } from './isBoolean';

describe('isBoolean', () => {
  test('must return true for booleans', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  test('must return false for non-booleans', () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(new Date())).toBe(false);
    expect(isBoolean(() => {})).toBe(false);
  });
});
