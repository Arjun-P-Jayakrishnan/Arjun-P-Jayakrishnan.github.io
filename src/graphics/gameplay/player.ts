import { getGlobalContext } from "@utils/globalContext";
import { AnimationMixer, Object3D, Scene } from "three";

export interface PlayerProps {
  ids: {
    rootMesh: string;
  };
}

export interface PlayerContext {
  scene: Scene;
}

export interface Player {
  create: () => void;
  update: (deltaTime: number) => void;
  destroy: () => void;
}

interface ObjectReferences {
  playerRoot: Object3D;
}

export const createPlayer = (
  props: PlayerProps,
  context: PlayerContext
): Player => {
  const { scene } = context;
  const { eventBusManager, globalState, globalStorage } = getGlobalContext();
  let objects: ObjectReferences;
  let mixer: AnimationMixer | null;

  const create = () => {
    try {
      const playerRoot = scene.getObjectByName(props.ids.rootMesh) as Object3D;

      if (!playerRoot) {
        throw new Error(`Player doesn't exist`);
      }

      mixer = new AnimationMixer(playerRoot);
      const animations = globalStorage
        .getStorage("animations")
        .retrieve("Room");
      //Local References
      objects = {
        playerRoot: playerRoot,
      };
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };

  const update = (deltaTime: number) => {
    if (mixer) {
      mixer.update(deltaTime);
    }
  };

  const destroy = () => {
    try {
      objects.playerRoot.clear();
    } catch (err) {
      console.error(`Error while destroy player ${err}`);
    }
  };

  return {
    create: create,
    update: update,
    destroy: destroy,
  };
};
