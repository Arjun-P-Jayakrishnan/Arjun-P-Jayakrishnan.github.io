import {
  getGlobalContext
} from "./chunk-VPKETTYQ.js";

// src/graphics/gameplay/player.ts
import { AnimationMixer } from "three";
var createPlayer = (props, context) => {
  const { scene } = context;
  const { eventBusManager, globalState, globalStorage } = getGlobalContext();
  let objects;
  let mixer;
  const create = () => {
    try {
      const playerRoot = scene.getObjectByName(props.ids.rootMesh);
      if (!playerRoot) {
        throw new Error(`Player doesn't exist`);
      }
      mixer = new AnimationMixer(playerRoot);
      const animations = globalStorage.getStorage("animations").retrieve("Room");
      objects = {
        playerRoot
      };
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };
  const update = (deltaTime) => {
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
    create,
    update,
    destroy
  };
};

export {
  createPlayer
};
//# sourceMappingURL=chunk-EQI662BS.js.map