import { AnimationClip, Group, Object3DEventMap } from "three";
import { createStorageUnit, StorageUnit } from "./storageUnit";

export interface GlobalStorageProps {}

export interface GlobalStorage {
  mount: () => void;
  unmount: () => void;
  getStorage: <K extends keyof StorageMap>(key: K) => GenericStorageUnit[K];
}

type StorageMap = {
  animations: AnimationClip[];
  groups: Group<Object3DEventMap>;
};

type GenericStorageUnit = {
  [K in keyof StorageMap]: StorageUnit<StorageMap[K]>;
};

export const createGlobalStorage = <K extends keyof StorageMap>(
  _props: GlobalStorageProps
): GlobalStorage => {
  let storage: GenericStorageUnit | undefined;

  const mount = () => {
    storage = {
      animations: createStorageUnit<AnimationClip[]>(),
      groups: createStorageUnit<Group<Object3DEventMap>>(),
    };
  };

  const unmount = () => {
    if (storage) {
    }
    storage = undefined;
  };

  const getStorage = <K extends keyof StorageMap>(
    key: K
  ): GenericStorageUnit[K] => {
    if (storage === undefined) {
      throw new Error(`Must mount the storage first`);
    }
    return storage[key];
  };

  return {
    mount: mount,
    unmount: unmount,
    getStorage: getStorage,
  };
};
