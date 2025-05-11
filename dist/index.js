import {
  createGlobalState
} from "./chunk-7BMUEPDY.js";
import "./chunk-5TTCCEAH.js";
import {
  createGameplay
} from "./chunk-3NKNVR7F.js";
import {
  createEventBusManager
} from "./chunk-YX72NHVV.js";
import "./chunk-GZBB6ODF.js";
import {
  attachReferences,
  mountComponents
} from "./chunk-AVJF6YMU.js";
import {
  createGameEngineInstance
} from "./chunk-HKAGDLCF.js";
import "./chunk-NCT4VP26.js";
import "./chunk-ESBHI3E2.js";
import "./chunk-AXJVKY2W.js";
import "./chunk-LBGUDF2D.js";
import "./chunk-MF5EUZRL.js";
import "./chunk-SAIL7PNR.js";
import "./chunk-ILJ6575Z.js";
import "./chunk-GYVXQHTM.js";
import "./chunk-FV5FXLPE.js";

// src/index.ts
var GLOBAL_STATE_INITIAL = {
  loading: {
    active: false,
    progress: 0
  }
};
var references;
var instances;
var mountWindowEventListeners = () => {
};
var preMount = () => {
  references = {
    globalState: createGlobalState(GLOBAL_STATE_INITIAL),
    eventBusManager: createEventBusManager()
  };
  references.globalState.inflate();
  mountComponents();
};
var mount = () => {
  attachReferences({
    state: references.globalState,
    eventBusManager: references.eventBusManager
  });
  instances = {
    gameEngine: createGameEngineInstance({
      globalState: references.globalState,
      eventBusManager: references.eventBusManager
    }),
    gamePlay: createGameplay(
      {},
      {
        globalState: references.globalState,
        eventBusManager: references.eventBusManager
      }
    )
  };
  Promise.allSettled([instances.gameEngine.mount(instances.gamePlay)]).then(
    () => {
      console.log("all components mounted");
      instances.gameEngine.update();
    }
  );
};
var unmount = () => {
  instances.gameEngine.unmount();
};
var main = () => {
  preMount();
  document.addEventListener("DOMContentLoaded", () => {
    mount();
    mountWindowEventListeners();
    window.addEventListener("beforeunload", () => {
      unmount();
    });
  });
};
main();
//# sourceMappingURL=index.js.map