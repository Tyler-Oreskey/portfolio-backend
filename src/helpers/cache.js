const NodeCache = require('node-cache');

const appCache = new NodeCache();

const getCacheItem = (key) => {
  return appCache.get(key);
};

const setCacheItem = (key, value, ttl) => {
  appCache.set(key, value, ttl);
  return value;
};

module.exports = { getCacheItem, setCacheItem };