import {
  createKeyboardController
} from "./chunk-7IE3MFFN.js";
import {
  getGlobalContext
} from "./chunk-SST3M2JD.js";

// src/graphics/gameplay/player.ts
import { AnimationMixer, Vector3 } from "three";
var PLAYER_CONSTANTS = {
  MOVEMENT_ACCELERATION: 0.05,
  MAX_VELOCITY: 0.05
};
var createPlayer = (props, context) => {
  const { scene } = context;
  const { eventBusManager, globalState, globalStorage } = getGlobalContext();
  let state = {
    direction: new Vector3(0, 0, -1),
    velocity: 0
  };
  let objects;
  let inputs = {
    keyboard: createKeyboardController()
  };
  let animations;
  const create = () => {
    try {
      let playerRoot = scene.getObjectByName(props.ids.rootMesh);
      if (!playerRoot) {
        throw new Error(
          `player doesn't exist for the id ${props.ids.rootMesh}`
        );
      }
      inputs.keyboard.mount();
      objects = {
        playerRoot
      };
      animations = {
        mixer: new AnimationMixer(playerRoot)
      };
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };
  const updateMouse = () => {
    state.direction.applyQuaternion(objects.playerRoot.quaternion);
    state.direction.normalize();
  };
  const updateKeyboard = (deltaTime) => {
    if (inputs.keyboard.isKeyPressed("w")) {
      state.velocity = PLAYER_CONSTANTS.MAX_VELOCITY;
      objects.playerRoot.position.z += state.velocity;
    }
    if (inputs.keyboard.isKeyPressed("s")) {
      state.velocity = PLAYER_CONSTANTS.MAX_VELOCITY;
      objects.playerRoot.position.z -= state.velocity;
    }
  };
  const updateControllers = (deltaTime) => {
    updateMouse();
    updateKeyboard(deltaTime);
  };
  const updateAnimation = (deltaTime) => {
    animations.mixer.update(deltaTime);
  };
  const update = (deltaTime) => {
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
    create,
    update,
    destroy
  };
};

export {
  createPlayer
};
//# sourceMappingURL=chunk-TOLZFMIO.js.map