import { ModelAssetDescriptor } from "./loader.types";

interface ModelIdentifier {
  /**Id as in given from outside */
  id: string;
  /**Id under which the whole model is configured */
  storageId: string;
}

interface RoomProps {
  [key: string]: ModelIdentifier;
}

interface Room {
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

interface GenericLifeCycle {
  mount: (...props: any) => void;
  activate: (...props: any) => void;
  deactivate: (...props: any) => void;
  unmount: (...props: any) => void;
}

export interface RoomAsset {
  meshes: ModelAssetDescriptor[];
  hdr?: ModelAssetDescriptor;
}

export { GenericLifeCycle, ModelIdentifier, Room, RoomProps };
