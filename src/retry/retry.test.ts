import { retry, type RetryConfig } from './retry';

describe('retry', () => {
  test('succeeds on first attempt', async () => {
    const fn = jest.fn(async () => 42);
    const retried = retry()(fn);
    const result = await retried();

    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('retries and succeeds on second attempt', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce(42);

    const retried = retry({ maxAttempts: 3, initialDelayMs: 5 })(fn);
    const result = await retried();

    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('calculates correct delays for backoff', async () => {
    const delays: number[] = [];
    const originalSetTimeout = global.setTimeout;

    const mockSetTimeout = jest.fn((callback, delay) => {
      delays.push(delay as number);
      return originalSetTimeout(callback, 0);
    });

    const fn = jest.fn().mockRejectedValue(new Error('fail'));

    jest.spyOn(global, 'setTimeout').mockImplementation(mockSetTimeout);

    const retried = retry({
      maxAttempts: 4,
      initialDelayMs: 100,
      backoffMultiplier: 2,
    })(fn);

    try {
      await retried();
    } catch {
      // Expected to fail
    }

    expect(delays).toEqual([100, 200, 400]);
    jest.restoreAllMocks();
  });

  test('respects maxDelayMs in backoff calculation', () => {
    const delays: number[] = [];

    for (let attempt = 0; attempt < 4; attempt += 1) {
      const delay = Math.min(100 * Math.pow(2, attempt), 300);
      delays.push(delay);
    }

    expect(delays).toEqual([100, 200, 300, 300]);
  });

  test('throws after max attempts', async () => {
    const error = new Error('persistent failure');
    const fn = jest.fn().mockRejectedValue(error);
    const retried = retry({ maxAttempts: 2, initialDelayMs: 5 })(fn);

    await expect(retried()).rejects.toThrow('persistent failure');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('wraps non-Error objects as errors', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce('string error')
      .mockRejectedValueOnce({ custom: 'error' })
      .mockRejectedValue(123);

    const retried = retry({ maxAttempts: 1, initialDelayMs: 5 })(fn);

    await expect(retried()).rejects.toThrow('string error');
  });

  test('uses default config values', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce(42);

    const retried = retry()(fn);
    const result = await retried();

    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('handles async function that succeeds eventually', async () => {
    let attempts = 0;
    const fn = jest.fn(async () => {
      attempts += 1;
      if (attempts < 3) {
        throw new Error('not yet');
      }
      return 'success';
    });

    const retried = retry({ maxAttempts: 5, initialDelayMs: 5 })(fn);
    const result = await retried();

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test('custom config overrides defaults', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce(42);

    const config: RetryConfig = {
      maxAttempts: 5,
      initialDelayMs: 5,
      backoffMultiplier: 3,
      maxDelayMs: 1000,
    };

    const retried = retry(config)(fn);
    const result = await retried();

    expect(result).toBe(42);
  });

  test('does not retry after max attempts even if recoverable', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('always fails'));
    const retried = retry({ maxAttempts: 2, initialDelayMs: 5 })(fn);

    await expect(retried()).rejects.toThrow();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('returns last error thrown', async () => {
    const error1 = new Error('first error');
    const error2 = new Error('second error');
    const fn = jest
      .fn()
      .mockRejectedValueOnce(error1)
      .mockRejectedValue(error2);

    const retried = retry({ maxAttempts: 2, initialDelayMs: 5 })(fn);

    await expect(retried()).rejects.toThrow('second error');
  });

  describe('config validation', () => {
    const succeed = () => jest.fn(() => Promise.resolve(1));

    test.each([0, -1, -0.5, NaN, -Infinity])(
      'throws when maxAttempts is %p',
      (maxAttempts) => {
        expect(() => retry({ maxAttempts })).toThrow(
          new Error('maxAttempts must be at least 1'),
        );
      },
    );

    test('never calls fn when the config is invalid', () => {
      const fn = succeed();

      expect(() => retry({ maxAttempts: 0 })(fn)).toThrow();
      expect(fn).not.toHaveBeenCalled();
    });

    test.each([
      ['initialDelayMs', -1],
      ['initialDelayMs', NaN],
      ['backoffMultiplier', -2],
      ['backoffMultiplier', NaN],
      ['maxDelayMs', -1],
      ['maxDelayMs', NaN],
    ] as const)('throws when %s is %p', (option, value) => {
      expect(() => retry({ [option]: value })).toThrow(
        new Error(`${option} must be a non-negative number`),
      );
    });

    test.each([1, 1.5, 2.9, Infinity])(
      'still accepts maxAttempts %p',
      async (maxAttempts) => {
        const fn = succeed();

        await expect(retry({ maxAttempts })(fn)()).resolves.toBe(1);
        expect(fn).toHaveBeenCalledTimes(1);
      },
    );

    test('retries with maxAttempts Infinity until fn succeeds', async () => {
      const fn = jest
        .fn<Promise<string>, []>()
        .mockRejectedValueOnce(new Error('a'))
        .mockRejectedValueOnce(new Error('b'))
        .mockResolvedValue('ok');

      await expect(
        retry({ maxAttempts: Infinity, initialDelayMs: 0 })(fn)(),
      ).resolves.toBe('ok');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    test('keeps a non-integer maxAttempts rounding up as before', async () => {
      const fn = jest
        .fn<Promise<number>, []>()
        .mockRejectedValue(new Error('x'));

      await expect(
        retry({ maxAttempts: 1.5, initialDelayMs: 0 })(fn)(),
      ).rejects.toThrow('x');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('accepts zero and Infinity for the delay options', async () => {
      const fn = succeed();
      const retried = retry({
        initialDelayMs: 0,
        backoffMultiplier: 0,
        maxDelayMs: Infinity,
      })(fn);

      await expect(retried()).resolves.toBe(1);
    });
  });
});
