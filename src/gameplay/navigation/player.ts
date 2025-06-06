import {
  AnimationController,
  createAnimationController,
} from "controllers/animation";
import { getThreeJsContext } from "core/game_engine/game_context";
import { createFSMController, FSMController } from "fsm/player";
import { getControllers } from "graphics/mechanics/controllers/controller";
import { KeyboardController } from "graphics/mechanics/controllers/plugins/keyboard";
import { MouseController } from "graphics/mechanics/controllers/plugins/mouse";
import { getGlobalContext } from "managers/globalContext";
import { AnimationMixer, Euler, Object3D, Scene, Vector3 } from "three";

export interface PlayerProps {
  rootMeshId: string;
}

export interface Player {
  mount: () => void;
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
  activate: () => void;
  deactivate: () => void;
  unmount: () => void;
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
  let animationController: AnimationController;
  let fsmController: FSMController;

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
  let inputs: {
    mouse: MouseController | null;
    keyboard: KeyboardController | null;
  } = {
    mouse: null,
    keyboard: null,
  };

  let objects: ObjectReferences;
  let animations: Animation;

  const mount = () => {
    try {
      let playerRoot = contextManager
        .get("scene")
        .getObjectByName(props.rootMeshId);
      const _animations =
        globalStorage.getStorage("player").retrieve("player")?.animations ?? [];

      if (!playerRoot) {
        throw new Error(`player doesn't exist for the id ${props.rootMeshId}`);
      }
      //Local References
      objects = {
        playerRoot: playerRoot,
      };

      inputs = {
        mouse: getControllers().getController("mouse"),
        keyboard: getControllers().getController("keyboard"),
      };

      const mixer = new AnimationMixer(playerRoot);
      animations = {
        mixer: mixer,
      };
      animationController = createAnimationController({
        mixer: mixer,
        actions: {
          Idle: mixer.clipAction(_animations[0]),
          Walk: mixer.clipAction(_animations[3]),
          Run: mixer.clipAction(_animations[1]),
        },
        crossFadeDuration: 0.3,
      });

      fsmController = createFSMController({
        animationController: animationController,
      });

      fsmController.mount();
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };

  const updateMouse = (
    mouse: { yaw: number; pitch: number },
    camera: { rotation: Euler }
  ) => {
    // state.rotationApplied = mouse;
    // objects.playerRoot.rotation.y += state.rotationApplied.yaw;
  };

  // const updateKeyboard = (deltaTime: number) => {
  //   if (!inputs.keyboard) return;
  //   const FRICTION = 5.0;
  //   const VELOCITY_DEADZONE = 0.001;

  //   const { inputDirection } = tempData;
  //   inputDirection.set(0, 0, 0);

  //   if (inputs.keyboard.isKeyPressed("w")) inputDirection.z -= 1;
  //   if (inputs.keyboard.isKeyPressed("s")) inputDirection.z += 1;
  //   if (inputs.keyboard.isKeyPressed("a")) inputDirection.x -= 1;
  //   if (inputs.keyboard.isKeyPressed("d")) inputDirection.x += 1;

  //   if (inputDirection.length() > 0) {
  //     //normalize direction
  //     inputDirection.applyQuaternion(objects.playerRoot.quaternion);
  //     inputDirection.normalize();

  //     //accelerate towards the direction
  //     state.velocity.add(
  //       inputDirection.multiplyScalar(
  //         PLAYER_CONSTANTS.MOVEMENT_ACCELERATION * deltaTime
  //       )
  //     );
  //     //ensure the velocity doesn't go over the threshold
  //     state.velocity.clampLength(0, PLAYER_CONSTANTS.MAX_VELOCITY);
  //   } else if (inputDirection.length() == 0 && state.velocity.length() > 0) {
  //     const decay = Math.exp(-FRICTION * deltaTime);
  //     state.velocity.multiplyScalar(decay);

  //     if (state.velocity.lengthSq() < VELOCITY_DEADZONE * VELOCITY_DEADZONE) {
  //       state.velocity.set(0, 0, 0);
  //     }
  //   }

  //   objects.playerRoot.position.add(state.velocity);
  // };

  // const updateControllers = (
  //   deltaTime: number,
  //   rotation: { yaw: number; pitch: number },
  //   camera: { rotation: Euler }
  // ) => {
  //   updateMouse(rotation, camera);
  //   updateKeyboard(deltaTime);
  // };

  // const updateAnimation = (deltaTime: number) => {
  //   animations.mixer!.update(deltaTime);
  // };

  const update = (
    deltaTime: number,
    rotation: { yaw: number; pitch: number },
    camera: { rotation: Euler }
  ) => {
    // if (animations.mixer) {
    //   updateAnimation(deltaTime);
    // }

    // updateControllers(deltaTime, rotation, camera);

    // return {
    //   position: objects.playerRoot.position,
    //   rotation: objects.playerRoot.rotation,
    // };

    fsmController.update(deltaTime);

    return {
      position: new Vector3(),
      rotation: new Euler(),
    };
  };

  const activate = () => {
    // objects.playerRoot.rotation.set(0,0,0,'XYZ')
  };

  const deactivate = () => {};

  const unmount = () => {
    try {
      //objects.playerRoot.clear();
    } catch (err) {
      console.error(`Error while destroy player ${err}`);
    }
  };

  return {
    mount: mount,
    activate: activate,
    deactivate: deactivate,
    update: update,
    unmount: unmount,
  };
};
