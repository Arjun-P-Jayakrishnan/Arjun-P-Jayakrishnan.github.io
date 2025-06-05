export type StorageType<T> = Map<string, T>;

export interface StorageUnit<T> {
  store: (id: string, payload: T) => void;
  retrieve: (id: string) => T | undefined;
}

export const createStorageUnit = <T>(): StorageUnit<T> => {
  const storage: StorageType<T> = new Map<string, T>();

  const store = (id: string, payload: T) => {
    storage.set(id, payload);
  };

  const retrieve = (id: string) => {
    return storage.get(id);
  };

  return {
    store: store,
    retrieve: retrieve,
  };
};
