import { delay } from './delay';

describe('delay', () => {
  test('resolves with value after delay', async () => {
    const start = Date.now();
    const result = await delay(50)(42);
    const elapsed = Date.now() - start;

    expect(result).toBe(42);
    expect(elapsed).toBeGreaterThanOrEqual(50);
    expect(elapsed).toBeLessThan(150);
  });

  test('resolves with string value', async () => {
    const result = await delay(10)('hello');
    expect(result).toBe('hello');
  });

  test('resolves with object value', async () => {
    const obj = { id: 1, name: 'test' };
    const result = await delay(10)(obj);
    expect(result).toEqual(obj);
  });

  test('resolves with array value', async () => {
    const arr = [1, 2, 3];
    const result = await delay(10)(arr);
    expect(result).toEqual(arr);
  });

  test('resolves with null', async () => {
    const result = await delay(10)(null);
    expect(result).toBeNull();
  });

  test('resolves with undefined', async () => {
    const result = await delay(10)(undefined);
    expect(result).toBeUndefined();
  });

  test('zero delay still returns promise', async () => {
    const result = await delay(0)(42);
    expect(result).toBe(42);
  });

  test('can be used in sequence', async () => {
    const start = Date.now();
    const first: number = await delay(20)(1);
    const second = await delay(20)(first + 1);
    const elapsed = Date.now() - start;

    expect(second).toBe(2);
    expect(elapsed).toBeGreaterThanOrEqual(40);
  });

  test('can be composed with promises', async () => {
    const promise = delay(10)(Promise.resolve(42));
    const result = await promise;
    expect(await result).toBe(42);
  });

  test('multiple concurrent delays', async () => {
    const start = Date.now();
    const results = await Promise.all([
      delay(30)(1),
      delay(30)(2),
      delay(30)(3),
    ]);
    const elapsed = Date.now() - start;

    expect(results).toEqual([1, 2, 3]);
    expect(elapsed).toBeGreaterThanOrEqual(30);
    expect(elapsed).toBeLessThan(150);
  });

  test('promise rejects appropriately', async () => {
    const delayedReject = delay(10)(Promise.reject(new Error('test')));
    await expect(delayedReject).rejects.toThrow('test');
  });
});
