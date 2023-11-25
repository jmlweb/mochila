type CacheOptions<T> = {
  max?: number;
  ttl?: number;
  onRemove?: (key: unknown, value: T) => void;
};

type Item<T> = {
  value: T;
  expiration?: number;
};

export const LRUCache = <T>({ max, ttl, onRemove }: CacheOptions<T> = {}) => {
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

  const deleteExpiredItems = () => {
    const now = Date.now();
    for (const [key, item] of items.entries()) {
      if (item.expiration && item.expiration < now) {
        deleteItem(key);
      }
    }
  };

  const refresh = () => {
    for (const key of keys) {
      deleteItem(key);
    }
  };

  const has = (key: unknown) => {
    deleteExpiredItems();
    return items.has(key);
  };

  const get = (key: unknown) => {
    deleteExpiredItems();
    return items.get(key)?.value;
  };

  const set = (key: unknown, value: T, ttlOverride?: number) => {
    deleteExpiredItems();
    keys.delete(key);
    if (keys.size === max) {
      const firstKey = keys.values().next().value;
      deleteItem(firstKey);
    }
    const parsedTt = ttlOverride || ttl;
    const expiration = parsedTt ? Date.now() + parsedTt : undefined;
    keys.add(key);
    items.set(key, { value, expiration });
  };

  return {
    delete: deleteItem,
    get,
    has,
    set,
    refresh,
  };
};
