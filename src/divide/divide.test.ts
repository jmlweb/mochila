import { divide } from './divide';

describe('divide', () => {
  it('should divide the first argument by the second', () => {
    expect(divide(4)(2)).toEqual(2);
  });

  it('should throw an error when dividing by zero', () => {
    expect(() => divide(4)(0)).toThrow('Division by zero is not allowed');
    expect(() => divide(-4)(0)).toThrow('Division by zero is not allowed');
    expect(() => divide(0)(0)).toThrow('Division by zero is not allowed');
  });

  it('should handle negative numbers', () => {
    expect(divide(4)(-2)).toEqual(-2);
    expect(divide(-4)(2)).toEqual(-2);
    expect(divide(-4)(-2)).toEqual(2);
  });

  it('should handle decimal numbers', () => {
    expect(divide(1)(2)).toEqual(0.5);
    expect(divide(3)(2)).toEqual(1.5);
    expect(divide(1.5)(0.5)).toEqual(3);
  });

  it('should handle Infinity', () => {
    expect(divide(Infinity)(2)).toEqual(Infinity);
    expect(divide(-Infinity)(2)).toEqual(-Infinity);
    expect(divide(4)(Infinity)).toEqual(0);
    expect(divide(4)(-Infinity)).toEqual(-0);
  });

  it('should handle NaN', () => {
    expect(divide(NaN)(2)).toBeNaN();
    expect(divide(4)(NaN)).toBeNaN();
    expect(divide(NaN)(NaN)).toBeNaN();
  });
});
