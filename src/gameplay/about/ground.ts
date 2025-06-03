
import { getThreeJsContext } from "core/game_engine/game_context";
import { Nullable } from "core/lifecyle";
import { processPipelineDebugger } from "debug/debugger";
import { createGridMaterial, GridMaterial } from "graphics/materials/grid/grid-material";
import { Material, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

export interface GroundProps {
  ids: {
    groundRoot: string;
  };
}

export interface Ground {
  mount: () => void;
  actiavte:()=>void;
  deactivate:()=>void;
  unmount: () => void;
}

export const createGround = (props: GroundProps): Ground => {
  let ground: Nullable<Mesh> = null;
  let contextManager = getThreeJsContext();

  const mount = () => {
    ground = contextManager
      .get("scene")
      .getObjectByName(props.ids.groundRoot) as Mesh;

    if (!ground) {
      console.error(
        `Cant get ground mesh from the id : ${props.ids.groundRoot}`
      );
      return;
    } 
    ground.material=(ground.material as Material).clone();
    ground.receiveShadow=true;
    
    (ground.material as Material).needsUpdate=true;
    (ground.material as MeshStandardMaterial).opacity=0.15;
    (ground.material as MeshStandardMaterial).transparent=true;
    
    processPipelineDebugger.onMount('about-ground')
  };

  const activate=()=>{}

  const deactivate=()=>{}

  const unmount = () => {};

  return {
    mount: mount,
    actiavte:activate,
    deactivate:deactivate,
    unmount: unmount,
  };
};
