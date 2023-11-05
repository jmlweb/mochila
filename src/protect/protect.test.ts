import { protect } from './protect';

describe('protect', () => {
  it('should return success: true and data if fn does not throw', () => {
    const fn = (a: number, b: number) => a + b;
    const protectedFn = protect(fn);
    const result = protectedFn(1, 2);
    expect(result).toEqual({
      success: true,
      data: 3,
    });
  });

  it('should return success: false and error if fn throws', () => {
    const fn = (a: number, b: number) => {
      if (a < 3 || b < 3) {
        throw new Error('test');
      }
    };
    const protectedFn = protect(fn);
    const result = protectedFn(1, 2);
    expect(result).toEqual({
      success: false,
      error: new Error('test'),
    });
  });

  it('should return success: true and data if fn does not throw (async)', async () => {
    const fn = async (a: number, b: number) => a + b;
    const protectedFn = protect(fn);
    const result = await protectedFn(1, 2);
    expect(result).toEqual({
      success: true,
      data: 3,
    });
  });

  it('should return success: false and error if fn throws (async)', async () => {
    const fn = async (a: number, b: number) => {
      if (a < 3 || b < 3) {
        throw new Error('test');
      }
    };
    const protectedFn = protect(fn);
    const result = await protectedFn(1, 2);
    expect(result).toEqual({
      success: false,
      error: new Error('test'),
    });
  });
});
