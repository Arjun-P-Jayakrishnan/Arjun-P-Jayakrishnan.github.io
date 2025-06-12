import { ModelAssetDescriptor } from "./loading";

export interface Room {
  /**Load and assign assets */
  mount: () => void;

  /** Update  */
  update: (deltaTime: number) => void;

  /**Release all assets and objects */
  unmount: () => void;

  /**Activate */
  setActive: () => void;

  /**Decativate */
  setDeactive: () => void;

  isLoaded: boolean;
}

export interface RoomAsset {
  meshes: ModelAssetDescriptor[];
  hdr?: ModelAssetDescriptor;
}
