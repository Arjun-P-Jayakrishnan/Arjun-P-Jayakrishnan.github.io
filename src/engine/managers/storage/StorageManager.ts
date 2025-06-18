import {
  JSONStorageUnit,
  ObjectStorageUnit,
  StorageKey,
  StorageMap,
} from "types/storage.types";
import { createStorageUnit } from "./genericStorageUnit";
import { GenericStorageUnit, GlobalStorageManager } from "./storageTypes";

export const createGlobalStorageManager = (): GlobalStorageManager => {
  let storage: Partial<{
    [K in StorageKey]: GenericStorageUnit<StorageMap[K]>;
  }> = {};

  const keys: StorageKey[] = ["model", "json"];

  const createStorageForType = (key: StorageKey) => {
    switch (key) {
      case "model":
        storage[key] = createStorageUnit<Record<string, ObjectStorageUnit>>();
        break;
      case "json":
        storage[key] = createStorageUnit<Record<string, JSONStorageUnit>>();
        break;
    }
  };

  const inflate = () => {
    keys.forEach(<K extends StorageKey>(key: K) => {
      createStorageForType(key);
    });
  };

  const clear = () => {
    Object.values(storage).forEach((unit) => {
      unit.clear();
    });
  };

  const getStorage = <K extends StorageKey>(
    key: K
  ): GenericStorageUnit<StorageMap[K]> => {
    if (!storage[key]) {
      createStorageForType(key);
    }

    return storage[key]!;
  };

  return {
    inflate: inflate,
    clear: clear,
    getStorage: getStorage,
  };
};
