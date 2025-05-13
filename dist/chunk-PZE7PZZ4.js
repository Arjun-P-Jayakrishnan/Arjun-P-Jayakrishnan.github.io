import {
  createPlayer
} from "./chunk-TOLZFMIO.js";
import {
  getGlobalContext
} from "./chunk-SST3M2JD.js";

// src/graphics/gameplay/gameplay.ts
import { Clock } from "three";
var createGameplay = (options) => {
  const { globalState, eventBusManager, globalStorage } = getGlobalContext();
  let state = {
    deltaTime: 0
  };
  let references;
  let context;
  let clock = new Clock();
  let tempData = {
    deltaTime: 0
  };
  const mount = (_context) => {
    const player = createPlayer(
      {
        ids: options.player.ids
      },
      {
        scene: _context.scene
      }
    );
    player.create();
    references = {
      player
    };
    context = _context;
  };
  const updateDeltaTime = () => {
    tempData.deltaTime = clock.getDelta();
    if (!isNaN(tempData.deltaTime)) {
      state.deltaTime = tempData.deltaTime;
    }
  };
  const update = () => {
    updateDeltaTime();
    references.player.update(state.deltaTime);
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
//# sourceMappingURL=chunk-PZE7PZZ4.js.map