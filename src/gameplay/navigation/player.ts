import { GenericLifeCycle, Nullable } from "@utils/types/lifecycle";
import {
  AnimationController,
  createAnimationController,
} from "controllers/animation";
import { getThreeJsContext } from "core/game_engine/game_context";
import { createFSMController, FSMController } from "fsm/player";
import {
  ControllerManger,
  getControllers,
} from "graphics/mechanics/controllers/controller";
import { KeyboardController } from "graphics/mechanics/controllers/plugins/keyboard";
import { MouseController } from "graphics/mechanics/controllers/plugins/mouse";
import { getGlobalContext } from "managers/globalContext";
import { AnimationMixer, Euler, Object3D, Scene, Vector3 } from "three";

export interface PlayerProps {
  rootMeshId: string;
}

export interface Player extends GenericLifeCycle {
  /** Update based on controller input */
  update: (deltaTime: number) => {
    position: Vector3;
    rotation: Euler;
    rotationDelta: { yaw: number; pitch: number };
  };
}

interface PlayerState {
  direction: Vector3;
  velocity: Vector3;
  rotationApplied: {
    yaw: number;
    pitch: number;
  };
}

interface Controllers {
  input: {
    mouse: Nullable<MouseController>;
    keyboard: Nullable<KeyboardController>;
  };
  animation: AnimationController;
  fsm: FSMController;
}

interface ObjectReferences {
  player: Nullable<Object3D>;
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

  let controllers: Controllers;

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

  let objects: ObjectReferences = { player: null };

  const mount = () => {
    try {
      const playerRoot = globalStorage.getStorage("player").retrieve("player");

      if (!playerRoot) {
        throw new Error(`player doesn't exist for the id ${props.rootMeshId}`);
      }
      const player = playerRoot?.groups;
      const animations = playerRoot?.animations;

      /**Input Controllers */
      const controller = getControllers();

      /**Animation */
      const mixer = new AnimationMixer(player);
      const animationController = createAnimationController({
        mixer: mixer,
        actions: {
          Idle: mixer.clipAction(animations[0]),
          Walk: mixer.clipAction(animations[3]),
          Run: mixer.clipAction(animations[1]),
        },
        crossFadeDuration: 0.3,
      });

      const fsmController = createFSMController({
        animationController: animationController,
      });
      fsmController.mount();

      objects = {
        player: player,
      };

      controllers = {
        input: {
          mouse: controller.getController("mouse"),
          keyboard: controller.getController("keyboard"),
        },
        animation: animationController,
        fsm: fsmController,
      };
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };

  const updateMouse = (mouse: Nullable<MouseController>) => {
    if (!mouse || !objects.player!) return;

    state.rotationApplied = mouse.getRotation();
    objects.player.rotation.y += state.rotationApplied.yaw;
  };

  const updateKeyboard = (
    keyboard: Nullable<KeyboardController>,
    deltaTime: number
  ) => {
    if (!keyboard || !objects.player) return;
    const FRICTION = 5.0;
    const VELOCITY_DEADZONE = 0.001;

    const { inputDirection } = tempData;
    inputDirection.set(0, 0, 0);

    if (keyboard.isKeyPressed("w")) inputDirection.z -= 1;
    if (keyboard.isKeyPressed("s")) inputDirection.z += 1;
    if (keyboard.isKeyPressed("a")) inputDirection.x -= 1;
    if (keyboard.isKeyPressed("d")) inputDirection.x += 1;

    if (inputDirection.length() > 0) {
      //normalize direction
      inputDirection.applyQuaternion(objects.player.quaternion);
      inputDirection.normalize();

      //accelerate towards the direction
      state.velocity.add(
        inputDirection.multiplyScalar(
          PLAYER_CONSTANTS.MOVEMENT_ACCELERATION * deltaTime
        )
      );
      //ensure the velocity doesn't go over the threshold
      state.velocity.clampLength(0, PLAYER_CONSTANTS.MAX_VELOCITY);
    } else if (inputDirection.length() == 0 && state.velocity.length() > 0) {
      const decay = Math.exp(-FRICTION * deltaTime);
      state.velocity.multiplyScalar(decay);

      if (state.velocity.lengthSq() < VELOCITY_DEADZONE * VELOCITY_DEADZONE) {
        state.velocity.set(0, 0, 0);
      }
    }

    objects.player.position.add(state.velocity);
  };

  const updateControllers = (deltaTime: number) => {
    updateMouse(controllers.input.mouse);
    updateKeyboard(controllers.input.keyboard, deltaTime);
  };

  const update = (deltaTime: number) => {
    updateControllers(deltaTime);

    controllers.fsm.update(deltaTime);

    return {
      position: objects.player?.position ?? new Vector3(0, 0, 0),
      rotation: objects.player?.rotation ?? new Euler(0, 0, 0, "XYZ"),
      rotationDelta: state.rotationApplied,
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
