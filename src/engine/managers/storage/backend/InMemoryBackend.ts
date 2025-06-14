import { StorageBackend } from "types/plugin.types";

export const createInMemoryBackend = <T>(): StorageBackend<T> => {
  const map = new Map<keyof T, T[keyof T]>();

  const _get = <K extends keyof T>(key: K): T[K] | undefined => {
    return map.get(key) as T[K] | undefined;
  };

  const _set = <K extends keyof T>(key: K, payload: T[K]): void => {
    map.set(key, payload);
  };

  const _clear = (): void => {
    map.clear();
  };

  const _delete = <K extends keyof T>(key: K): void => {
    map.delete(key);
  };

  const _keys = (): IterableIterator<keyof T> => {
    return map.keys();
  };

  return {
    get: _get,
    set: _set,
    clear: _clear,
    delete: _delete,
    keys: _keys,
  };
};
