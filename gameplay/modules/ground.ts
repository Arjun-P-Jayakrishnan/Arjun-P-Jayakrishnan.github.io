import { getThreeJsContext } from "graphics/internal/context";
import { createGridMaterial, GridMaterial } from "graphics/materials/grid/grid-material";
import { Mesh } from "three";

export interface GroundProps {
  ids: {
    groundRoot: string;
  };
}

export interface Ground {
  mount: () => void;
  update: () => void;
  unmount: () => void;
}

export const createGround = (props: GroundProps): Ground => {
  let ground: Mesh | null = null;
  let contextManager = getThreeJsContext();

  let gridMat: GridMaterial | null = null;

  const mount = () => {
    ground = contextManager
      .getProperty("scene")
      .getObjectByName(props.ids.groundRoot) as Mesh;

    if (!ground) {
      console.error(
        `Cant get ground mesh from the id : ${props.ids.groundRoot}`
      );
      return;
    }

    gridMat = createGridMaterial({
      camera: contextManager.getProperty("camera"),
      fadeNear: 0.1,
      fadeFar: 1,
    });

    ground.material = gridMat.mat;
  };

  const update = () => {
    gridMat?.update(contextManager.getProperty("camera").position)
  };

  const unmount = () => {};

  return {
    mount: mount,
    update:update,
    unmount: unmount,
  };
};
