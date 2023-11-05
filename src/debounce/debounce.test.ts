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
});
