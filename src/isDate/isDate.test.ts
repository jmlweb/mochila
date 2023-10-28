import { isDate } from './isDate';

describe('isDate', () => {
  it('should return true for Date', () => {
    expect(isDate(new Date())).toBe(true);
  });
  it('should return false for non-Date', () => {
    expect(isDate('a')).toBe(false);
    expect(isDate({})).toBe(false);
  });
});
