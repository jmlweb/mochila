import { moduloBy } from './moduloBy';

describe('moduloBy', () => {
  it('should return the remainder of two numbers passed in reverse order', () => {
    expect(moduloBy(2)(3)).toBe(1);
    expect(moduloBy(2)(2)).toBe(0);
    expect(moduloBy(2)(1)).toBe(1);
  });
});
