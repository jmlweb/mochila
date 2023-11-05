import { isNumber } from './isNumber';

describe('isNumber', () => {
  test('must return true for numbers', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(Number('a'))).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(Number.NaN)).toBe(true);
  });
  test('must return false for non-numbers', () => {
    expect(isNumber('a')).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber(new Date())).toBe(false);
    expect(isNumber(() => {})).toBe(false);
  });
});
