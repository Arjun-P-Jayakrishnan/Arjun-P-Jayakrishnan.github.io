import { getGlobalContext } from "@managers/globalContext";
import { Nullable } from "@utils/types/lifecycle";
import { processPipelineDebugger } from "debug/debugger";
import { Material, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

export interface GroundProps {
  groundId: string;
  storageId: string;
}

export interface Ground {
  mount: () => void;
  actiavte: () => void;
  deactivate: () => void;
  unmount: () => void;
}

export const createGround = (props: GroundProps): Ground => {
  let ground: Nullable<Mesh> = null;
  const { globalStorage } = getGlobalContext();

  const mount = () => {
    const groups = globalStorage
      .getStorage(props.storageId)
      .retrieve(props.storageId)?.groups;
    ground = groups?.getObjectByName(props.groundId) as Mesh;

    if (!ground) {
      console.error(`Cant get ground mesh from the id : ${props.groundId}`);
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

    processPipelineDebugger.onMount("about-ground");
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
