import { throttle } from './throttle';

const double = jest.fn((x: number) => x * 2);

describe('throttle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should resolve the last passed value', () => {
    const throttledDouble = throttle(200, double);
    throttledDouble(2);
    throttledDouble(4);
    const result = throttledDouble(5);
    expect(result).toBe(4);
    expect(double).toHaveBeenCalledTimes(1);
  });
  test('should get the new value after the delay', () => {
    jest.useFakeTimers();
    const throttledDouble = throttle(200, double);
    let result = throttledDouble(5);
    expect(result).toBe(10);
    expect(double).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(250);
    result = throttledDouble(12);
    expect(result).toBe(24);
    expect(double).toHaveBeenCalledTimes(2);
  });
  test('should work when called multiple times', async () => {
    const throttledDouble = throttle(200, double);
    const result = [throttledDouble(2), throttledDouble(4), throttledDouble(5)];
    expect(result).toEqual([4, 4, 4]);
    expect(double).toHaveBeenCalledTimes(1);
  });
  test('should work even if the function throws', () => {
    const error = new Error('test');
    const fn = jest.fn(() => {
      throw error;
    });
    const throttledFn = throttle(200, fn);
    expect(() => {
      throttledFn();
      throttledFn();
    }).toThrow(error);
    expect(fn).toHaveBeenCalledTimes(1);
  });
  test('should return defined value on first call', () => {
    const fn = jest.fn((x: number) => x * 2);
    const throttledDouble = throttle(200, fn);
    const result = throttledDouble(5);
    expect(result).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });
  test('should handle functions that return undefined', () => {
    const fn = jest.fn(() => undefined);
    const throttledFn = throttle(200, fn);
    const result = throttledFn();
    expect(result).toBeUndefined();
    expect(fn).toHaveBeenCalledTimes(1);
  });
  test('should execute on first unblocked call even after block', () => {
    jest.useFakeTimers();
    const fn = jest.fn((x: number) => x * 2);
    const throttledFn = throttle(200, fn);

    // First call should execute immediately
    let result = throttledFn(5);
    expect(result).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);

    // During blocked period - should return previous result
    result = throttledFn(10);
    expect(result).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);

    // Advance time slightly, still in blocked period
    jest.advanceTimersByTime(100);
    result = throttledFn(15);
    expect(result).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);

    // Advance to end of throttle period
    jest.advanceTimersByTime(100);
    result = throttledFn(20);
    expect(result).toBe(40);
    expect(fn).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });
});
