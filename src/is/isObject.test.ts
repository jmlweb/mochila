import { isObject } from './isObject';

describe('isObject', () => {
  test('must return true for plain objects', () => {
    expect(isObject({})).toBe(true);
  });

  test('must return true for date objects', () => {
    expect(isObject(new Date())).toBe(true);
  });

  test('must return false for null', () => {
    expect(isObject(null)).toBe(false);
  });
  test('must return false for a string', () => {
    expect(isObject('a')).toBe(false);
  });
  test('must return false for a function', () => {
    expect(isObject(() => {})).toBe(false);
  });
});
