import { Logger } from "@utils/Logger";
import { GlobalStorageManager } from "engine/managers/storage/storageTypes";
import { createGridMaterial, GridMaterial } from "materials/grid/grid-material";
import { Mesh, PerspectiveCamera } from "three";
import { ModelIdentifier } from "types/rooms.types";

export interface GroundProps {
  references: ModelIdentifier;
  storage: GlobalStorageManager;
  logger: Logger;
  camera: PerspectiveCamera;
}

export interface Ground {
  mount: () => void;
  update: () => void;
  activate: () => void;
  deactivate: () => void;
  unmount: () => void;
}

export const createGround = ({
  logger,
  references,
  storage,
  camera,
}: GroundProps): Ground => {
  let ground: Nullable<Mesh> = null;
  let gridMat: Nullable<GridMaterial> = null;

  const mount = () => {
    ground =
      (storage
        .getStorage("model")
        .retrieve(references.storageId)
        ?.groups.getObjectByName(references.id) as Mesh) ?? null;

    if (!ground) {
      console.error(
        `Cant get ground mesh from the id : ${references.id} ${references.storageId}`
      );
      return;
    }

    gridMat = createGridMaterial({
      camera: camera,
      fadeNear: 0.1,
      fadeFar: 1,
    });

    ground.material = gridMat.mat;
    logger.onMount({ origin: "Navigation-Ground" });
  };

  const update = () => {
    gridMat?.update(camera.position);
  };

  const activate = () => {};
  const deactivate = () => {};

  const unmount = () => {};

  return {
    mount: mount,
    update: update,
    activate: activate,
    deactivate: deactivate,
    unmount: unmount,
  };
};
