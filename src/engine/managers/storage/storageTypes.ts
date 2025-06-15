import { StorageKey, StorageMap } from "types/managers.types";

/**
 * Storage Unit Layer Responsible for the management of backend layer
 */
interface GenericStorageUnit<T> {
  store: <K extends keyof T>(id: K, payload: T[K]) => void;
  retrieve: <K extends keyof T>(id: K) => T[K] | undefined;
  delete: <K extends keyof T>(id: K) => void;
  has: <K extends keyof T>(id: K) => void;
  clear: () => void;
  size: () => void;
}

/**
 * Global manager for every storage units made available by the storage units
 */
interface GlobalStorageManager {
  inflate: () => void;
  clear: () => void;
  getStorage: <K extends StorageKey>(
    id: K
  ) => GenericStorageUnit<StorageMap[K]>;
}

type BackendTypes = "InMemory";

export type { BackendTypes, GenericStorageUnit, GlobalStorageManager };
