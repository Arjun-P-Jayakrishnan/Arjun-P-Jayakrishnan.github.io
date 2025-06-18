import { Logger } from "@utils/Logger";
import { GlobalStorageManager } from "engine/managers/storage/storageTypes";
import { AnimationMixer, Object3D, Object3DEventMap, Scene } from "three";
import { ModelIdentifier } from "types/rooms.types";

export interface PlayerProps {
  reference: ModelIdentifier;
  storage: GlobalStorageManager;
  logger: Logger;
}

export interface PlayerContext {
  scene: Scene;
}

export interface Player {
  mount: () => void;
  activate: () => void;
  update: (deltaTime: number) => void;
  deactiavte: () => void;
  unmount: () => void;
}

interface ObjectReferences {
  playerRoot: Object3D;
}

export const createPlayer = ({
  logger,
  reference,
  storage,
}: PlayerProps): Player => {
  let objects: ObjectReferences;
  let mixers: AnimationMixer[] = [];

  const castShadow = (player: Object3D<Object3DEventMap>) => {
    player.traverse((child) => {
      child.castShadow = true;
    });
  };

  const mount = () => {
    try {
      let playerRoot = storage
        .getStorage("model")
        .retrieve(reference.storageId)?.groups;
      // let animations =
      //   storage.getStorage("model").retrieve(reference.storageId)?.animations ??
      //   [];

      if (!playerRoot) {
        throw new Error(
          `player doesn't exist for the id ${reference.storageId}`
        );
      }

      //Local References
      objects = {
        playerRoot: playerRoot,
      };

      // // console.log('armature',armature)
      // const mixer = new AnimationMixer(playerRoot);
      // mixer.clipAction(animations[2]).play();

      // mixers.push(mixer);
      logger.onMount({ origin: "Project-Room-Player" });
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };

  const activate = () => {
    if (objects.playerRoot) {
      objects.playerRoot.rotation.set(0, 0, 0, "XYZ");
      objects.playerRoot.castShadow = true;
      castShadow(objects.playerRoot);
    }
  };

  const update = (deltaTime: number) => {
    mixers.forEach((mixer) => {
      mixer.update(deltaTime);
    });
  };

  const deactivate = () => {};

  const unmount = () => {};

  return {
    mount: mount,
    activate: activate,
    update: update,
    deactiavte: deactivate,
    unmount: unmount,
  };
};
