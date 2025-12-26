
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheItem<any>>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

export const getFromCache = <T>(key: string): T | null => {
  const item = cache.get(key);
  if (!item) {
    return null;
  }

  const isExpired = (Date.now() - item.timestamp) > CACHE_DURATION;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return item.data as T;
};

export const setInCache = <T>(key: string, data: T) => {
  const item: CacheItem<T> = {
    data,
    timestamp: Date.now(),
  };
  cache.set(key, item);
};
