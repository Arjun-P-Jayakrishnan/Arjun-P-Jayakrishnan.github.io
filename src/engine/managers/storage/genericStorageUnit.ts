import { StorageBackend } from "types/plugin.types";
import { createInMemoryBackend } from "../../../plugins/backend/InMemoryBackend";
import { BackendTypes, GenericStorageUnit } from "./storageTypes";

const selectBackend = <T>(key: BackendTypes): StorageBackend<T> => {
  const backend = createInMemoryBackend<T>();

  return backend;
};

//T is the storage structure of object
//player {animations:Type,model:type etc}
export const createStorageUnit = <T>(): GenericStorageUnit<T> => {
  /** string mapped  */
  const backend = selectBackend<T>("InMemory");

  const store = <K extends keyof T>(id: K, payload: T[K]): void => {
    backend.set(id, payload);
  };

  const retrieve = <K extends keyof T>(id: K): T[K] | undefined => {
    return backend.get(id) as T[K] | undefined;
  };

  const deleteKey = <K extends keyof T>(id: K): void => {
    backend.delete(id);
  };

  const has = <K extends keyof T>(id: K): boolean => {
    if (!backend.get(id)) {
      return true;
    }

    return false;
  };

  const clear = (): void => {
    backend.clear();
  };

  const size = (): number => {
    return backend.keys.length;
  };

  return {
    store: store,
    retrieve: retrieve,
    clear: clear,
    delete: deleteKey,
    has: has,
    size: size,
  };
};
