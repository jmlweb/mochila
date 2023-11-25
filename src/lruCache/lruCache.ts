type Options = {
  max?: number;
  ttl?: number;
};

/**
 * A Least Recently Used (LRU) Cache implementation.
 * @template Item The type of items stored in the cache.
 * @param {Options} [options] The options for the cache.
 * @param {number} [options.max] The maximum number of items to store in the cache.
 * @param {number} [options.ttl] The time-to-live (in milliseconds) for each item in the cache.
 * @returns {LRUCache<Item>} The LRU cache object.
 */
export const LRUCache = <Item>({ max, ttl }: Options = {}) => {
  const valuesMap = new Map<unknown, Item>();
  const expirationMap = new Map<unknown, number>();
  let keys: unknown[] = [];

  /**
   * Removes the specified key from the cache.
   * @param key - The key to be removed.
   */
  const remove = (key: unknown) => {
    valuesMap.delete(key);
    expirationMap.delete(key);
    keys = keys.filter((k) => k !== key);
  };

  /**
   * Removes expired entries from the cache.
   */
  const removeExpired = () => {
    for (const [key, expiration] of expirationMap.entries()) {
      const now = Date.now();
      if (expiration < now) {
        remove(key);
      }
    }
  };

  /**
   * Clears the cache by removing all values, expirations, and keys.
   */
  const refresh = () => {
    valuesMap.clear();
    expirationMap.clear();
    keys = [];
  };

  /**
   * Retrieves the value associated with the specified key from the LRU cache.
   * If the key is not found or the associated value has expired, it returns undefined.
   * @param key - The key to retrieve the value for.
   * @returns The value associated with the key, or undefined if not found or expired.
   */
  const get = (key: unknown) => {
    removeExpired();
    return valuesMap.get(key);
  };

  /**
   * Checks if the LRU cache contains a specific key.
   *
   * @param key - The key to check.
   * @returns True if the cache contains the key, false otherwise.
   */
  const has = (key: unknown) => {
    removeExpired();
    return valuesMap.has(key);
  };

  /**
   * Sets a key-value pair in the LRU cache.
   * If the cache is at its maximum capacity, the least recently used item will be removed.
   * If a time-to-live (TTL) value is specified, the item will expire after the specified time.
   *
   * @param key - The key of the item to set.
   * @param value - The value of the item to set.
   */
  const set = (key: unknown, value: Item, itemTtl?: number) => {
    removeExpired();
    if (max) {
      while (keys.length >= max) {
        remove(keys[0]);
      }
    }
    valuesMap.set(key, value);
    const parsedTtl = itemTtl ?? ttl;
    if (parsedTtl) {
      const expiration = Date.now() + parsedTtl;
      expirationMap.set(key, expiration);
    }
    keys.push(key);
  };

  return {
    delete: remove,
    get,
    has,
    set,
    refresh,
  };
};
