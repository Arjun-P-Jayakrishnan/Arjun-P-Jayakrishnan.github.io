import { InputManager } from "engine/managers/InputManager";
import { GlobalStorageManager } from "engine/managers/storage/storageTypes";
import { KeyboardInput } from "plugins/input/keyboard";
import { MouseInput } from "plugins/input/mouse";
import { Euler, Object3D, Vector3 } from "three";
import { Nullable } from "types/generic.types";
import { GenericLifeCycle, ModelIdentifier } from "types/rooms.types";

export interface PlayerProps {
  reference: ModelIdentifier;
  storage: GlobalStorageManager;
  InputManager: InputManager;
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
    mouse: Nullable<MouseInput>;
    keyboard: Nullable<KeyboardInput>;
  };
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

export const createPlayer = ({
  reference,
  storage,
  InputManager,
}: PlayerProps): Player => {
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
      const playerRoot = storage
        .getStorage("model")
        .retrieve(reference.storageId);

      if (!playerRoot) {
        throw new Error(
          `player doesn't exist for the id ${reference.storageId}`
        );
      }
      const player = playerRoot?.groups;
      const animations = playerRoot?.animations;

      objects = {
        player: player,
      };

      controllers = {
        input: {
          mouse: InputManager.getController("mouse"),
          keyboard: InputManager.getController("keyboard"),
        },
      };
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };

  const updateMouse = (mouse: Nullable<MouseInput>) => {
    if (!mouse || !objects.player!) return;

    state.rotationApplied = mouse.getRotation();
    objects.player.rotation.y += state.rotationApplied.yaw;
  };

  const updateKeyboard = (
    keyboard: Nullable<KeyboardInput>,
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

    return {
      position: objects.player?.position ?? new Vector3(0, 0, 0),
      rotation: objects.player?.rotation ?? new Euler(0, 0, 0, "XYZ"),
      rotationDelta: state.rotationApplied,
    };
  };

  const activate = () => {
    if (objects.player) {
      objects.player.position.set(0, 0, 0);
      objects.player.rotation.set(0, 0, 0);
      console.log("actiavting player for navigation", objects.player?.position);
    }
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
