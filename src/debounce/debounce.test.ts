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

  describe('when fn throws synchronously', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    test('rejects every pending promise with the thrown error', async () => {
      const boom = new Error('boom');
      const debounced = debounce(10, () => {
        throw boom;
      });
      const first = debounced();
      const second = debounced();
      const assertions = Promise.all([
        expect(first).rejects.toBe(boom),
        expect(second).rejects.toBe(boom),
      ]);
      expect(() => jest.advanceTimersByTime(10)).not.toThrow();
      await assertions;
    });

    test('keeps working for later calls after a throw', async () => {
      let shouldThrow = true;
      const fn = jest.fn((x: number) => {
        if (shouldThrow) throw new Error('first call fails');
        return x * 2;
      });
      const debounced = debounce(10, fn);
      const failing = debounced(1);
      const failingAssertion =
        expect(failing).rejects.toThrow('first call fails');
      jest.advanceTimersByTime(10);
      await failingAssertion;

      shouldThrow = false;
      const recovered = debounced(4);
      jest.advanceTimersByTime(10);
      await expect(recovered).resolves.toBe(8);
    });

    test('still calls fn synchronously inside the timer callback', () => {
      const fn = jest.fn((x: number) => x);
      const debounced = debounce(10, fn);
      void debounced(7);
      expect(fn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(10);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(7);
    });

    test('still rejects pending promises when fn rejects asynchronously', async () => {
      const debounced = debounce(10, () => Promise.reject(new Error('async')));
      const result = debounced();
      const assertion = expect(result).rejects.toThrow('async');
      jest.advanceTimersByTime(10);
      await assertion;
    });
  });
});
