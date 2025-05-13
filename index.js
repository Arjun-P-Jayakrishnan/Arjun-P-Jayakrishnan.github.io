import {
  createWebComponentManager
} from "./chunk-A347YDUQ.js";
import "./chunk-ENFNW7QU.js";
import "./chunk-VG4EIVRD.js";
import {
  assetMetaData
} from "./chunk-B6YRUXKO.js";
import {
  createGameManager
} from "./chunk-2XEB47CF.js";
import "./chunk-PZE7PZZ4.js";
import "./chunk-TOLZFMIO.js";
import "./chunk-7IE3MFFN.js";
import "./chunk-HE3AK42F.js";
import "./chunk-65NZVKWT.js";
import "./chunk-3MKXO7VX.js";
import "./chunk-CG3IICMH.js";
import {
  getGlobalContext
} from "./chunk-SST3M2JD.js";
import "./chunk-XPVTQ5X4.js";
import "./chunk-C7GSUODC.js";
import "./chunk-5CXWWAPA.js";
import "./chunk-Q3X5D5A7.js";
import "./chunk-WQAD2CJ7.js";
import "./chunk-FD3PG7P2.js";
import "./chunk-Y5OJP2U5.js";
import "./chunk-SMKCWAHP.js";
import "./chunk-5I4CIZ7R.js";

// src/index.ts
var references;
var managers;
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
  managers.gameEngine.mount();
  Promise.allSettled([managers.gameEngine.load()]).then((responses) => {
    responses.forEach((response) => {
      if (response.status == "rejected") {
        throw new Error(
          `Failed to load models and mount game engine ${response.reason}`
        );
      }
    });
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
    window.addEventListener("beforeunload", () => {
      unmount();
    });
  });
};
(() => {
  main();
})();
//# sourceMappingURL=index.js.map