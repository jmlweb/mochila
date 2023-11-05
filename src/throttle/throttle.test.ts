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
});
