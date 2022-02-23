type SaveInCache = <T>(
  cache: Record<string, T>,
  key: string
) => (value: T) => T;

const saveInCache: SaveInCache = (cache, key) => (value) => {
  if (value) {
    cache[key] = value;
  }
  return value;
};

/**
 * Optimization technique to avoid performing multiple requests given the same argument.
 *
 * @param request A function that requests some data based on a string.
 * @returns The request but doesn't re-runs if it receives the same argument multiple times.
 */
const cacheRequest = <P>(request: (arg: string) => Promise<P>) => {
  const cachedValues: Record<string, P> = {};

  return (arg: string) => {
    const value = cachedValues[arg];

    return value
      ? Promise.resolve(value)
      : request(arg).then(saveInCache(cachedValues, arg));
  };
};

export { cacheRequest };
