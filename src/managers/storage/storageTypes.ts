import { AnimationClip, Group, Object3DEventMap } from "three";

export type ObjectStorageUnit = {
  type: string;
  animations: AnimationClip[];
  groups: Group<Object3DEventMap>;
};
