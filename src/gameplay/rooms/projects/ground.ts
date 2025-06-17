import { Logger } from "@utils/Logger";
import { GlobalStorageManager } from "engine/managers/storage/storageTypes";
import { Material, Mesh, MeshStandardMaterial } from "three";
import { ModelIdentifier } from "types/rooms.types";

export interface GroundProps {
  reference: ModelIdentifier;
  logger: Logger;
  storage: GlobalStorageManager;
}

export interface Ground {
  mount: () => void;
  actiavte: () => void;
  deactivate: () => void;
  unmount: () => void;
}

export const createGround = ({
  reference,
  logger,
  storage,
}: GroundProps): Ground => {
  let ground: Nullable<Mesh> = null;

  const mount = () => {
    const groups = storage
      .getStorage("model")
      .retrieve(reference.storageId)?.groups;
    ground = groups?.getObjectByName(reference.id) as Mesh;

    if (!ground) {
      console.error(`Cant get ground mesh from the id : ${reference.id}`);
      return;
    }
    ground.material = (ground.material as Material).clone();
    ground.receiveShadow = true;

    (ground.material as Material).needsUpdate = true;
    (ground.material as MeshStandardMaterial).opacity = 1;
    (ground.material as MeshStandardMaterial).transparent = true;
    const excludeShadow = ["sky", "ground"];

    groups?.traverse((child) => {
      if (!excludeShadow.includes(child.name)) {
        child.castShadow = true;
      }
    });

    logger.onMount({ origin: "about-ground" });
  };

  const activate = () => {};

  const deactivate = () => {};

  const unmount = () => {};

  return {
    mount: mount,
    actiavte: activate,
    deactivate: deactivate,
    unmount: unmount,
  };
};
