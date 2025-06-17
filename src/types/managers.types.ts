import { AnimationClip, Group, Object3DEventMap } from "three";

/** Storage format for the models added */
type ObjectStorageUnit = {
  animations: AnimationClip[];
  groups: Group<Object3DEventMap>;
};

//The payload type for JSON files
type JSONStorageUnit = {
  content: string;
};

type StorageMapType = {
  model: ObjectStorageUnit;
  json: JSONStorageUnit;
};

type StorageKey = keyof StorageMapType;

type StorageMap = {
  [K in StorageKey]: Record<string, StorageMapType[K]>;
};

export type {
  JSONStorageUnit,
  ObjectStorageUnit,
  StorageKey,
  StorageMap,
  StorageMapType,
};
