import { getGlobalContext } from "@utils/globalContext";
import { getThreeJsContext } from "graphics/internal/context";
import { AnimationMixer, Euler, Object3D, Scene, Vector3 } from "three";
import { getControllers } from "../controllers/controller";

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
  update: (
    deltaTime: number,
    rotation: {
      yaw: number;
      pitch: number;
    },
    camera: {
      rotation: Euler;
    }
  ) => {
    position: Vector3;
    rotation: Euler;
  };
  destroy: () => void;
}

interface PlayerState {
  direction: Vector3;
  velocity: Vector3;
  rotationApplied: {
    yaw: number;
    pitch: number;
  };
}

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

export const createPlayer = (props: PlayerProps): Player => {
  const { eventBusManager, globalState, globalStorage } = getGlobalContext();
  const contextManager = getThreeJsContext();

  let state: PlayerState = {
    direction: new Vector3(0, 0, -1),
    velocity: new Vector3(0, 0, 0),
    rotationApplied: {
      pitch: 0,
      yaw: 0,
    },
  };
  let tempData: TempData = {
    inputDirection: new Vector3(0, 0, 0),
  };
  let inputs = getControllers();

  let objects: ObjectReferences;
  let animations: Animation;

  const create = () => {
    try {
      let playerRoot = contextManager
        .getProperty("scene")
        .getObjectByName(props.ids.rootMesh);

      // const playerRoot=scene.getObjectByName(props.ids.rootMesh) as Object3D;

      if (!playerRoot) {
        throw new Error(
          `player doesn't exist for the id ${props.ids.rootMesh}`
        );
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

  const updateMouse = (
    mouse: { yaw: number; pitch: number },
    camera: { rotation: Euler }
  ) => {
    state.rotationApplied = mouse;
    objects.playerRoot.rotation.y += state.rotationApplied.yaw;
  };

  const updateKeyboard = (deltaTime: number) => {
    const { inputDirection } = tempData;
    inputDirection.set(0, 0, 0);

    if (inputs.getController("keyboard")!.isKeyPressed("w")) {
      inputDirection.z += 1;
    }

    if (inputs.getController("keyboard")!.isKeyPressed("s")) {
      inputDirection.z -= 1;
    }

    if (inputs.getController("keyboard")!.isKeyPressed("a")) {
      inputDirection.x += 1;
    }

    if (inputs.getController("keyboard")!.isKeyPressed("d")) {
      inputDirection.x -= 1;
    }

    if (inputDirection.length() > 0) {
      inputDirection.normalize();
    }

    if (inputDirection.length() > 0) {
      //accelerate towards the direction

      state.velocity.add(
        inputDirection.multiplyScalar(
          PLAYER_CONSTANTS.MOVEMENT_ACCELERATION * deltaTime
        )
      );

      state.velocity.clampLength(0, PLAYER_CONSTANTS.MAX_VELOCITY);
    } else if (state.velocity.length() > 0) {
      state.velocity.multiplyScalar(
        1 - PLAYER_CONSTANTS.MOVEMENT_ACCELERATION * deltaTime
      );
    }

    objects.playerRoot.position.add(state.velocity);
  };

  const updateControllers = (
    deltaTime: number,
    rotation: { yaw: number; pitch: number },
    camera: { rotation: Euler }
  ) => {
    updateMouse(rotation, camera);
    updateKeyboard(deltaTime);
  };

  const updateAnimation = (deltaTime: number) => {
    animations.mixer!.update(deltaTime);
  };

  const update = (
    deltaTime: number,
    rotation: { yaw: number; pitch: number },
    camera: { rotation: Euler }
  ) => {
    if (animations.mixer) {
      updateAnimation(deltaTime);
    }

    updateControllers(deltaTime, rotation, camera);

    return {
      position: objects.playerRoot.position,
      rotation: objects.playerRoot.rotation,
    };
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
