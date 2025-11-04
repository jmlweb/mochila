import { modulo } from './modulo';

describe('modulo', () => {
  it('should return the remainder of a division', () => {
    expect(modulo(5)(2)).toBe(1);
    expect(modulo(2)(5)).toBe(2);
  });

  it('should handle negative numbers correctly', () => {
    expect(modulo(-4)(2)).toBe(0);
    expect(modulo(-5)(2)).toBe(1);
    expect(modulo(4)(-2)).toBe(0);
    expect(modulo(5)(-2)).toBe(-1);
    expect(modulo(-4)(-2)).toBe(0);
    expect(modulo(-5)(-2)).toBe(-1);
  });

  it('should handle zero', () => {
    expect(modulo(0)(2)).toBe(0);
    expect(modulo(5)(0)).toBeNaN();
  });
});
