import { LoadOptions } from "./loader.types";

/**
 * Backend Plugin Layer for Managing different types of data storage solutions
 */
interface StorageBackend<T> {
  set: <K extends keyof T>(key: K, payload: T[K]) => void;
  get: <K extends keyof T>(key: K) => T[K] | undefined;
  delete: <K extends keyof T>(key: K) => void;
  clear: () => void;
  keys: () => IterableIterator<keyof T>;
}

/**
 * Loader Plugin for different
 */
interface LoaderPlugin {
  load: (assets: LoadOptions) => Promise<void>;
}

export type { LoaderPlugin, StorageBackend };
