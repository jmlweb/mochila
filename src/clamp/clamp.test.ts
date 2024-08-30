import { clamp } from './clamp';

describe('clamp', () => {
  it('should work for positive numbers in the upper limit', () => {
    const clamped = clamp(0, 10)(15);
    expect(clamped).toBe(10);
  });
  it('should work for positive numbers in the lower limit', () => {
    const clamped = clamp(0, 10)(-5);
    expect(clamped).toBe(0);
  });
  it('should work for positive numbers in the middle', () => {
    const clamped = clamp(0, 10)(5);
    expect(clamped).toBe(5);
  });
  it('should work for negative numbers in the upper limit', () => {
    const clamped = clamp(-10, 0)(5);
    expect(clamped).toBe(0);
  });
  it('should work for negative numbers in the lower limit', () => {
    const clamped = clamp(-10, 0)(-15);
    expect(clamped).toBe(-10);
  });
  it('should work for negative numbers in the middle', () => {
    const clamped = clamp(-10, 0)(-5);
    expect(clamped).toBe(-5);
  });
});
