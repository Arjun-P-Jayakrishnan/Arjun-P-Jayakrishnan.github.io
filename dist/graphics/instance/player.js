// src/graphics/instance/player.ts
import { AnimationMixer } from "three";
var createPlayer = (props, context) => {
  const { scene, globalState, eventBusManager } = context;
  let objects;
  const create = () => {
    try {
      const playerRoot = scene.getObjectByName(props.ids.rootMesh);
      const mixer = new AnimationMixer(playerRoot);
      objects = {
        playerRoot
      };
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };
  const update = (deltaTime) => {
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
//# sourceMappingURL=player.js.map