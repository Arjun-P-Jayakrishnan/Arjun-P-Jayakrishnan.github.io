import {
  createWebComponentManager
} from "./chunk-XNOJY5EL.js";
import "./chunk-GYVXQHTM.js";
import "./chunk-FV5FXLPE.js";
import {
  assetMetaData
} from "./chunk-XDB3IDUD.js";
import {
  createGameManager
} from "./chunk-SG2G6X6H.js";
import "./chunk-L5V5HRGJ.js";
import "./chunk-EQI662BS.js";
import "./chunk-VF3YSWXH.js";
import "./chunk-4XQ26LJR.js";
import "./chunk-AXJVKY2W.js";
import "./chunk-IZZD5KRL.js";
import {
  getGlobalContext
} from "./chunk-VPKETTYQ.js";
import "./chunk-YX72NHVV.js";
import "./chunk-GZBB6ODF.js";
import "./chunk-7BMUEPDY.js";
import "./chunk-5TTCCEAH.js";
import "./chunk-KRR62UQE.js";
import "./chunk-N4NUAA62.js";
import "./chunk-MF5EUZRL.js";
import "./chunk-SAIL7PNR.js";
import "./chunk-ILJ6575Z.js";

// src/index.ts
var references;
var managers;
var mountWindowEventListeners = () => {
};
var preMount = () => {
  references = getGlobalContext();
  managers = {
    webComponent: createWebComponentManager(),
    gameEngine: createGameManager({
      loaderOptions: {
        meshesMetaData: assetMetaData.meshes,
        hdrMetaData: assetMetaData.hdr
      }
    })
  };
  managers.webComponent.mountComponents();
};
var mount = () => {
  managers.webComponent.attachReferences();
  Promise.allSettled([managers.gameEngine.mount()]).then((responses) => {
    responses.forEach((response) => {
      if (response.status == "rejected") {
        throw new Error(
          `Failed to load models and mount game engine ${response.reason}`
        );
      }
    });
    console.log("all components mounted");
    managers.gameEngine.update();
  });
};
var unmount = () => {
  managers.webComponent.unmountComponents();
  managers.gameEngine.unmount();
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
(() => {
  main();
})();
//# sourceMappingURL=index.js.map