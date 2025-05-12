import {
  createPlayer
} from "./chunk-EQI662BS.js";
import {
  getGlobalContext
} from "./chunk-VPKETTYQ.js";

// src/graphics/gameplay/gameplay.ts
var createGameplay = (options) => {
  const { globalState, eventBusManager, globalStorage } = getGlobalContext();
  let references;
  const mount = (context) => {
    const player = createPlayer(
      {
        ids: options.player.ids
      },
      {
        scene: context.scene
      }
    );
    player.create();
    references = {
      player
    };
  };
  const update = () => {
    references.player.update(0);
  };
  const unmount = () => {
    references.player.destroy();
  };
  return {
    mount,
    update,
    unmount
  };
};

export {
  createGameplay
};
//# sourceMappingURL=chunk-L5V5HRGJ.js.map