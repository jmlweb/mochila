import { debounce } from './debounce';

const double = jest.fn((x: number) => x * 2);

describe('debounce', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should resolve the last passed value', async () => {
    const throttledDouble = debounce(200, double);
    throttledDouble(2);
    throttledDouble(4);
    const result = await throttledDouble(5);
    expect(result).toBe(10);
    expect(double).toHaveBeenCalledTimes(1);
  });
  test('should get the new value after the delay', async () => {
    const throttledDouble = debounce(200, double);
    let result = await throttledDouble(5);
    expect(result).toBe(10);
    expect(double).toHaveBeenCalledTimes(1);
    result = await throttledDouble(12);
    expect(result).toBe(24);
    expect(double).toHaveBeenCalledTimes(2);
  });
  test('should work when called multiple times', async () => {
    const throttledDouble = debounce(200, double);
    const p = [throttledDouble(2), throttledDouble(4), throttledDouble(5)];
    const result = await Promise.all(p);
    expect(result).toEqual([10, 10, 10]);
    expect(double).toHaveBeenCalledTimes(1);
  });
  test('should reject oldest promises when exceeding maximum pending limit', async () => {
    jest.useFakeTimers();
    const fn = jest.fn((x: number) => x);
    const debouncedFn = debounce(200, fn);
    const promises: Promise<number>[] = [];
    for (let i = 0; i < 1001; i++) {
      promises.push(debouncedFn(i));
    }
    await expect(promises[0]).rejects.toThrow(
      'Debounce: too many pending promises, oldest promise rejected',
    );
    jest.advanceTimersByTime(250);
    const lastResult = await promises[1000];
    expect(lastResult).toBe(1000);
    jest.useRealTimers();
  });
});
