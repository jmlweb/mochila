import { LRUCache } from './lruCache';

describe('LRUCache', () => {
  it('should store and retrieve items correctly', () => {
    const cache = LRUCache<string>({ max: 3 });

    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');

    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key2')).toBe('value2');
    expect(cache.get('key3')).toBe('value3');
  });

  it('should evict the least recently used item when reaching the maximum capacity', () => {
    const cache = LRUCache<string>({ max: 3 });

    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');
    cache.set('key4', 'value4');

    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toBe('value2');
    expect(cache.get('key3')).toBe('value3');
    expect(cache.get('key4')).toBe('value4');
  });

  it('should respect the time-to-live (TTL) for each item', (done) => {
    const cache = LRUCache<string>({ max: 3, ttl: 100 });

    cache.set('key1', 'value1');
    cache.set('key2', 'value2', 200);

    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key2')).toBe('value2');

    // Wait for 150 milliseconds
    setTimeout(() => {
      expect(cache.get('key1')).toBeUndefined();
      expect(cache.get('key2')).toBe('value2');
    }, 150);

    // Wait for 250 milliseconds
    setTimeout(() => {
      expect(cache.get('key1')).toBeUndefined();
      expect(cache.get('key2')).toBeUndefined();
      done();
    }, 250);
  });

  it('should work using arrays as keys as long as they keep the same reference', () => {
    const cache = LRUCache<string>({ max: 3 });

    const key1 = [1, 2, 3];
    const key2 = [1, 2, 3];

    cache.set(key1, 'value1');
    cache.set(key2, 'value2');

    expect(cache.get(key1)).toBe('value1');
    expect(cache.get(key2)).toBe('value2');
  });

  it('should throw an error when max is not a positive integer', () => {
    expect(() => LRUCache<string>({ max: 0 })).toThrow('max must be a positive integer');
    expect(() => LRUCache<string>({ max: -1 })).toThrow('max must be a positive integer');
    expect(() => LRUCache<string>({ max: 1.5 })).toThrow('max must be a positive integer');
  });

  it('should throw an error when ttl is not a positive number', () => {
    expect(() => LRUCache<string>({ ttl: 0 })).toThrow('ttl must be a positive number');
    expect(() => LRUCache<string>({ ttl: -1 })).toThrow('ttl must be a positive number');
  });
});
