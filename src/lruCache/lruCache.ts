type CacheOptions<T> = {
  max?: number;
  ttl?: number;
  onRemove?: (key: unknown, value: T) => void;
};

type Item<T> = {
  value: T;
  expiration?: number;
};

/**
 * Creates a Least Recently Used (LRU) cache.
 *
 * The returned object has the following methods:
 *
 * - `delete`: Deletes an item from the cache.
 * - `get`: Returns the value of an item in the cache.
 * - `has`: Returns whether an item is in the cache.
 * - `set`: Sets an item in the cache.
 * - `refresh`: Deletes all items from the cache.
 *
 * Reading a live item with `get` or `has` marks it as most recently used, so
 * when the cache is full `set` evicts the least recently used item.
 *
 * @category Cache
 *
 * @typeParam T - The type of the cached items.
 * @param options - The cache options.
 * @returns The cache object.
 *
 * @example
 * ```
 * const cache = LRUCache<string>({ max: 2, ttl: 1000 });
 * cache.set('a', 'A');
 * cache.set('b', 'B');
 * cache.set('c', 'C');
 * cache.get('a'); // undefined
 * cache.get('b'); // 'B'
 * cache.refresh();
 * cache.get('b'); // undefined
 * cache.set('d', 'D');
 * cache.get('d'); // 'D'
 * setTimeout(() => cache.get('d'), 1000); // undefined
 * ```
 */
export const LRUCache = <T>({ max, ttl, onRemove }: CacheOptions<T> = {}) => {
  if (max !== undefined && (max <= 0 || !Number.isInteger(max))) {
    throw new Error('max must be a positive integer');
  }
  if (ttl !== undefined && ttl <= 0) {
    throw new Error('ttl must be a positive number');
  }

  const keys = new Set<unknown>();
  const items = new Map<unknown, Item<T>>();

  const deleteItem = (key: unknown) => {
    const item = items.get(key);
    items.delete(key);
    keys.delete(key);
    if (item && onRemove) {
      onRemove(key, item.value);
    }
  };

  const refresh = () => {
    for (const key of keys) {
      deleteItem(key);
    }
  };

  // A live hit re-inserts the key so Set iteration order tracks recency of use.
  const getLiveItem = (key: unknown) => {
    const item = items.get(key);
    if (!item) {
      return undefined;
    }
    if (item.expiration && item.expiration < Date.now()) {
      deleteItem(key);
      return undefined;
    }
    keys.delete(key);
    keys.add(key);
    return item;
  };

  const has = (key: unknown) => getLiveItem(key) !== undefined;

  const get = (key: unknown) => getLiveItem(key)?.value;

  const set = (key: unknown, value: T, ttlOverride?: number) => {
    keys.delete(key);
    if (keys.size === max) {
      const firstKey = keys.values().next().value;
      deleteItem(firstKey);
    }
    const parsedTt = ttlOverride ?? ttl;
    const expiration = parsedTt ? Date.now() + parsedTt : undefined;
    keys.add(key);
    items.set(
      key,
      expiration === undefined ? { value } : { value, expiration },
    );
  };

  return {
    delete: deleteItem,
    get,
    has,
    set,
    refresh,
  };
};
