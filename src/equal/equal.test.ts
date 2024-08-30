import { equal } from './equal';

describe('equal', () => {
  it('should return true when the values are equal', () => {
    expect(equal(1)(1)).toBe(true);
  });

  it('should return false when the values are not equal', () => {
    expect(equal(1)(2)).toBe(false);
  });
});
