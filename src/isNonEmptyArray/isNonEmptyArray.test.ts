import { isNonEmptyArray } from './isNonEmptyArray';

describe('isNonNullable', () => {
  test('must return true when the array has at least 2 elements', () => {
    expect(isNonEmptyArray([0, 1])).toBe(true);
  });

  test('must return false for an empty array', () => {
    expect(isNonEmptyArray([])).toBe(false);
  });
});
