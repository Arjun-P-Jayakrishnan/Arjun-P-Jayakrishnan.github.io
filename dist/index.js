import {
  createWebComponentManager
} from "./chunk-VPNTWSQP.js";
import "./chunk-GYVXQHTM.js";
import "./chunk-FV5FXLPE.js";
import {
  assetMetaData
} from "./chunk-XDB3IDUD.js";
import {
  createGameManager
} from "./chunk-447P7X5V.js";
import "./chunk-YLB7TJSH.js";
import "./chunk-OFMDL3CG.js";
import "./chunk-OLXLSJIZ.js";
import "./chunk-HHAQB2Z2.js";
import "./chunk-MJG6QX2M.js";
import "./chunk-AXJVKY2W.js";
import "./chunk-2HOXMPIN.js";
import {
  getGlobalContext
} from "./chunk-VEIAASVO.js";
import "./chunk-YX72NHVV.js";
import "./chunk-GZBB6ODF.js";
import "./chunk-7BMUEPDY.js";
import "./chunk-5TTCCEAH.js";
import "./chunk-JXWZWTEW.js";
import "./chunk-N4NUAA62.js";
import "./chunk-QQFHRQGR.js";
import "./chunk-SAIL7PNR.js";
import "./chunk-ILJ6575Z.js";

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