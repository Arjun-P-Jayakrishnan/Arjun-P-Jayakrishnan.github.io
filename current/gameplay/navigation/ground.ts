import { getGlobalContext } from "@managers/globalContext";
import { getThreeJsContext } from "core/game_engine/game_context";
import { processPipelineDebugger } from "debug/debugger";
import { Mesh } from "three";
import {
  createGridMaterial,
  GridMaterial,
} from "../../../current/graphics/materials/grid/grid-material";
import { Nullable } from "../../../current/utils/types/lifecycle";

export interface GroundProps {
  groundId: string;
  storageId: string;
}

export interface Ground {
  mount: () => void;
  update: () => void;
  activate: () => void;
  deactivate: () => void;
  unmount: () => void;
}

export const createGround = (props: GroundProps): Ground => {
  let ground: Nullable<Mesh> = null;
  let { globalStorage } = getGlobalContext();
  let contextManager = getThreeJsContext();

  let gridMat: Nullable<GridMaterial> = null;

  const mount = () => {
    ground =
      (globalStorage
        .getStorage(props.storageId)
        .retrieve(props.storageId)
        ?.groups.getObjectByName(props.groundId) as Mesh) ?? null;

    if (!ground) {
      console.error(`Cant get ground mesh from the id : ${props.groundId}`);
      return;
    }

    gridMat = createGridMaterial({
      camera: contextManager.get("camera"),
      fadeNear: 0.1,
      fadeFar: 1,
    });

    ground.material = gridMat.mat;
    processPipelineDebugger.onMount("navigation-ground");
    console.log(ground, gridMat);
  };

  const update = () => {
    gridMat?.update(contextManager.get("camera").position);
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
