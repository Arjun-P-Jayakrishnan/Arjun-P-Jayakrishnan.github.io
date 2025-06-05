import { ObjectStorageUnit } from "./storageTypes";
import { createStorageUnit, StorageUnit } from "./storageUnit";

export interface GlobalStorageProps {}

export interface GlobalStorage {
  mount: () => void;
  unmount: () => void;
  getStorage: (id: string) => StorageUnit<StorageMap>;
}

type StorageMap = ObjectStorageUnit;

type GenericStorageUnit = {
  [id: string]: StorageUnit<StorageMap>;
};

export const createGlobalStorage = (
  _props: GlobalStorageProps
): GlobalStorage => {
  let storage: GenericStorageUnit | undefined;
  let unit: StorageUnit<StorageMap>;
  const mount = () => {
    storage = {};
  };

  const unmount = () => {
    if (storage) {
    }
    storage = undefined;
  };

  const getStorage = (key: string): StorageUnit<StorageMap> => {
    if (storage === undefined) {
      throw new Error(`Must mount the storage first`);
    }
    unit = storage[key];

    if (unit === undefined) {
      unit = createStorageUnit();
      storage[key] = unit;
    }

    return unit;
  };

  return {
    mount: mount,
    unmount: unmount,
    getStorage: getStorage,
  };
};
