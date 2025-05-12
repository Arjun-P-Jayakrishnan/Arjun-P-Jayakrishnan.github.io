import {
  createGameplay
} from "./chunk-3NKNVR7F.js";
import {
  attachReferences,
  mountComponents
} from "./chunk-3HWCPPUL.js";
import "./chunk-FV5FXLPE.js";
import {
  createGameEngineInstance
} from "./chunk-MD6WGLMW.js";
import "./chunk-NCT4VP26.js";
import "./chunk-ZAKNM56N.js";
import "./chunk-HGVJPPFW.js";
import "./chunk-AXJVKY2W.js";
import {
  getGlobalContext
} from "./chunk-I2VKQKAB.js";
import "./chunk-YX72NHVV.js";
import "./chunk-7BMUEPDY.js";
import "./chunk-5TTCCEAH.js";
import "./chunk-KRR62UQE.js";
import "./chunk-N4NUAA62.js";
import "./chunk-GZBB6ODF.js";
import "./chunk-MF5EUZRL.js";
import "./chunk-SAIL7PNR.js";
import "./chunk-ILJ6575Z.js";
import "./chunk-GYVXQHTM.js";

// src/index.ts
var references;
var instances;
var mountWindowEventListeners = () => {
};
var preMount = () => {
  references = getGlobalContext();
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