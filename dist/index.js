import {
  createEventBusManager
} from "./chunk-5WONOMRB.js";
import {
  createGameplay
} from "./chunk-3NKNVR7F.js";
import {
  createGlobalState
} from "./chunk-7BMUEPDY.js";
import "./chunk-5TTCCEAH.js";
import "./chunk-GZBB6ODF.js";
import {
  attachReferences,
  mountComponents
} from "./chunk-XMGR7NKB.js";
import "./chunk-P47HCMVN.js";
import "./chunk-2IHVB7FE.js";
import "./chunk-6LLUGI2C.js";
import "./chunk-JAXJMVVI.js";
import {
  createGameEngineInstance
} from "./chunk-XKVK7FBW.js";
import "./chunk-Z6FJIZR7.js";
import "./chunk-ESBHI3E2.js";
import "./chunk-AXJVKY2W.js";
import "./chunk-LBGUDF2D.js";

// src/index.ts
var GLOBAL_STATE_INITIAL = {
  loading: {
    active: false,
    progress: 0
  }
};
var references;
var instances;
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
    window.addEventListener("beforeunload", () => {
      unmount();
    });
  });
};
main();
//# sourceMappingURL=index.js.map