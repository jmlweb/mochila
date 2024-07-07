import { isRegExp } from './isRegExp';

describe('isRegExp', () => {
  it('should return true for RegExp', () => {
    expect(isRegExp(/hola/i)).toBe(true);
    expect(isRegExp(new RegExp('hola'))).toBe(true);
  });
  it('should return false for non-RegExp', () => {
    expect(isRegExp('a')).toBe(false);
    expect(isRegExp({})).toBe(false);
  });
});
