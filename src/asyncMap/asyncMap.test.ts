import { asyncMap } from './asyncMap';

describe('asyncMap', () => {
  test('maps async function over array', async () => {
    const fn = jest.fn(async (x: number) => x * 2);
    const result = await asyncMap(fn)([1, 2, 3]);

    expect(result).toEqual([2, 4, 6]);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test('resolves with empty array', async () => {
    const fn = jest.fn(async (x: number) => x);
    const result = await asyncMap(fn)([]);

    expect(result).toEqual([]);
    expect(fn).not.toHaveBeenCalled();
  });

  test('handles promises that resolve', async () => {
    const fn = async (x: number) => Promise.resolve(x + 1);
    const result = await asyncMap(fn)([1, 2, 3]);

    expect(result).toEqual([2, 3, 4]);
  });

  test('executes all promises concurrently', async () => {
    const calls: number[] = [];
    const fn = async (x: number) => {
      calls.push(x);
      await new Promise((resolve) => setTimeout(resolve, 10));
      return x * 2;
    };

    const start = Date.now();
    const result = await asyncMap(fn)([1, 2, 3]);
    const elapsed = Date.now() - start;

    expect(result).toEqual([2, 4, 6]);
    expect(calls).toHaveLength(3);
    expect(elapsed).toBeLessThan(100); // Should be ~10ms not ~30ms
  });

  test('rejects if any promise rejects', async () => {
    const fn = jest.fn(async (x: number) => {
      if (x === 2) {
        throw new Error('failed');
      }
      return x * 2;
    });

    await expect(asyncMap(fn)([1, 2, 3])).rejects.toThrow('failed');
  });

  test('handles different return types', async () => {
    const fn = async (x: number): Promise<string> => String(x);
    const result = await asyncMap(fn)([1, 2, 3]);

    expect(result).toEqual(['1', '2', '3']);
  });

  test('preserves order of results', async () => {
    const fn = async (x: number) => {
      const delay = Math.random() * 50;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return x * 2;
    };

    const result = await asyncMap(fn)([1, 2, 3, 4, 5]);

    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  test('works with objects', async () => {
    interface User {
      id: number;
      name: string;
    }

    const fn = async (user: User): Promise<string> => user.name.toUpperCase();
    const users: User[] = [
      { id: 1, name: 'alice' },
      { id: 2, name: 'bob' },
    ];

    const result = await asyncMap(fn)(users);
    expect(result).toEqual(['ALICE', 'BOB']);
  });

  test('handles single element array', async () => {
    const fn = async (x: number) => x * 2;
    const result = await asyncMap(fn)([5]);

    expect(result).toEqual([10]);
  });

  test('can be composed with pipe', async () => {
    const fn1 = async (x: number) => x * 2;
    const fn2 = async (x: number) => x + 1;

    const results = await asyncMap(fn1)([1, 2, 3]);
    const mapped = await asyncMap(fn2)(results);

    expect(mapped).toEqual([3, 5, 7]);
  });
});
