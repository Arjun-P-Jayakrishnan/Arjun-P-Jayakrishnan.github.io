import { Logger } from "@utils/Logger";
import { GlobalStorageManager } from "engine/managers/storage/storageTypes";
import {
  AnimationMixer,
  Object3D,
  Object3DEventMap,
  Scene,
  Vector3,
} from "three";
import { ModelIdentifier } from "types/rooms.types";

export interface PlayerProps {
  reference: ModelIdentifier;
  logger: Logger;
  storage: GlobalStorageManager;
  scene: Scene;
}

export interface PlayerContext {
  scene: Scene;
}

export interface Player {
  mount: () => void;
  activate: () => void;
  deactiavte: () => void;
  unmount: () => void;
}

interface PlayerState {}

interface ObjectReferences {
  playerRoot: Object3D;
}

interface Animation {
  mixer: AnimationMixer | null;
}

const PLAYER_CONSTANTS = {
  MOVEMENT_ACCELERATION: 0.05,
  MAX_VELOCITY: 0.05,
};

interface TempData {
  inputDirection: Vector3;
}

export const createPlayer = ({
  logger,
  reference,
  scene,
  storage,
}: PlayerProps): Player => {
  let objects: ObjectReferences;
  let animations: Animation;

  const castShadow = (player: Object3D<Object3DEventMap>) => {
    player.traverse((child) => {
      child.castShadow = true;
    });
  };

  const mount = () => {
    try {
      logger.onMount({ origin: "about-room-player" });
      let playerRoot = scene.getObjectByName(reference.id);

      if (!playerRoot) {
        throw new Error(`player doesn't exist for the id ${reference.id}`);
      }

      //Local References
      objects = {
        playerRoot: playerRoot,
      };

      animations = {
        mixer: new AnimationMixer(playerRoot),
      };
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };

  const activate = () => {
    if (objects.playerRoot) {
      objects.playerRoot.rotation.set(0, -Math.PI / 4, 0, "XYZ");
      objects.playerRoot.castShadow = true;
      castShadow(objects.playerRoot);

      objects.playerRoot.position.set(1.5, 0, 0);
    }
  };

  const deactivate = () => {};

  const unmount = () => {
    if (objects.playerRoot) {
      objects.playerRoot.position.set(1.5, 0, 0);
    }
  };

  return {
    mount: mount,
    activate: activate,
    deactiavte: deactivate,
    unmount: unmount,
  };
};
