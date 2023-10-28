import { isFunction } from './isFunction';

describe('isFunction', () => {
  test('must return true for functions', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(function named() {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(async function () {})).toBe(true);
    expect(isFunction(async function named() {})).toBe(true);
    expect(isFunction(function* () {})).toBe(true);
    expect(isFunction(function* named() {})).toBe(true);
  });

  test('must return false for non-functions', () => {
    expect(isFunction(0)).toBe(false);
    expect(isFunction('')).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(new Date())).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
  });
});
