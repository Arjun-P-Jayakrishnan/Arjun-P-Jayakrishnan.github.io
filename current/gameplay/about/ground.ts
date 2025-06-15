import { getGlobalContext } from "@managers/globalContext";
import { getThreeJsContext } from "core/game_engine/game_context";
import { processPipelineDebugger } from "debug/debugger";
import { Material, Mesh, MeshStandardMaterial } from "three";
import { Nullable } from "../../../current/utils/types/lifecycle";

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
  let contextManager = getThreeJsContext();
  let { globalStorage } = getGlobalContext();

  const mount = () => {
    ground = globalStorage
      .getStorage(props.storageId)
      .retrieve(props.storageId)
      ?.groups.getObjectByName(props.groundId) as Mesh;

    if (!ground) {
      console.error(`Cant get ground mesh from the id : ${props.groundId}`);
      return;
    }
    ground.material = (ground.material as Material).clone();
    ground.receiveShadow = true;

    (ground.material as Material).needsUpdate = true;
    (ground.material as MeshStandardMaterial).opacity = 0.15;
    (ground.material as MeshStandardMaterial).transparent = true;

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
