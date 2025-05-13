import { getGlobalContext } from "@utils/globalContext";
import { AnimationMixer, Object3D, Scene, Vector3 } from "three";
import {
  createKeyboardController,
  KeyboardController,
} from "./controllers/keyboard";

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

interface PlayerState {
  direction: Vector3;
  velocity: number;
}

interface ObjectReferences {
  playerRoot: Object3D;
}

interface Inputs {
  keyboard: KeyboardController;
}

interface Animation {
  mixer: AnimationMixer | null;
}

const PLAYER_CONSTANTS = {
  MOVEMENT_ACCELERATION: 0.05,
  MAX_VELOCITY: 0.05,
};

export const createPlayer = (
  props: PlayerProps,
  context: PlayerContext
): Player => {
  const { scene } = context;
  const { eventBusManager, globalState, globalStorage } = getGlobalContext();

  let state: PlayerState = {
    direction: new Vector3(0, 0, -1),
    velocity: 0,
  };
  let objects: ObjectReferences;
  let inputs: Inputs = {
    keyboard: createKeyboardController(),
  };
  let animations: Animation;

  const create = () => {
    try {
      let playerRoot = scene.getObjectByName(props.ids.rootMesh);

      // const playerRoot=scene.getObjectByName(props.ids.rootMesh) as Object3D;

      if (!playerRoot) {
        throw new Error(
          `player doesn't exist for the id ${props.ids.rootMesh}`
        );
      }

      inputs.keyboard.mount();

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

  const updateMouse = () => {
    state.direction.applyQuaternion(objects.playerRoot.quaternion);
    state.direction.normalize();
  };

  const updateKeyboard = (deltaTime: number) => {
    if (inputs.keyboard.isKeyPressed("w")) {
      // if (state.velocity.z > -PLAYER_CONSTANTS.MAX_VELOCITY) {
      //   state.velocity.z -= PLAYER_CONSTANTS.MOVEMENT_ACCELERATION * deltaTime;
      // }

      state.velocity = PLAYER_CONSTANTS.MAX_VELOCITY;

      objects.playerRoot.position.z += state.velocity;
    }

    if (inputs.keyboard.isKeyPressed("s")) {
      // if (state.velocity.z < PLAYER_CONSTANTS.MAX_VELOCITY) {
      //   state.velocity.z += PLAYER_CONSTANTS.MOVEMENT_ACCELERATION * deltaTime;
      // }

      state.velocity = PLAYER_CONSTANTS.MAX_VELOCITY;

      objects.playerRoot.position.z -= state.velocity;
    }
  };

  const updateControllers = (deltaTime: number) => {
    updateMouse();
    updateKeyboard(deltaTime);
  };

  const updateAnimation = (deltaTime: number) => {
    animations.mixer!.update(deltaTime);
  };

  const update = (deltaTime: number) => {
    if (animations.mixer) {
      updateAnimation(deltaTime);
    }

    updateControllers(deltaTime);
  };

  const destroy = () => {
    try {
      objects.playerRoot.clear();
      inputs.keyboard.unmount();
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
