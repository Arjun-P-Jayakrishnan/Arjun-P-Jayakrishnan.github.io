import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { GlobalState } from "@utils/state/globalState";
import { AnimationMixer, Object3D, Scene } from "three";

export interface PlayerProps {
  ids: {
    rootMesh: string;
  };
}

export interface PlayerContext {
  scene: Scene;
  globalState: GlobalState;
  eventBusManager: EventBusManager;
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
  const { scene, globalState, eventBusManager } = context;
  let objects: ObjectReferences;

  const create = () => {
    try {
      const playerRoot = scene.getObjectByName(props.ids.rootMesh) as Object3D;

      const mixer = new AnimationMixer(playerRoot);

      //Local References
      objects = {
        playerRoot: playerRoot,
      };
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };

  const update = (deltaTime: number) => {};

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
