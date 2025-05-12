import {
  createGameplay
} from "./chunk-L5V5HRGJ.js";
import {
  createThreeJsInstance
} from "./chunk-VF3YSWXH.js";
import {
  createLoader
} from "./chunk-4XQ26LJR.js";
import {
  getGlobalContext
} from "./chunk-VPKETTYQ.js";

// src/graphics/main.ts
var createGameManager = (props) => {
  const { globalState, eventBusManager } = getGlobalContext();
  const engineInstance = createThreeJsInstance({
    camera: {},
    domMountTag: "game-engine"
  });
  const { scene, renderer, camera, controls } = engineInstance;
  const loaderInstance = createLoader(props.loaderOptions, {
    globalState,
    loaderEventBus: eventBusManager.loadingBus,
    renderer,
    scene
  });
  const gameplay = createGameplay({
    player: {
      ids: {
        rootMesh: "player"
      }
    }
  });
  const _handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  const _handleDebug = (e) => {
    if (e.key.toLowerCase() === "u" && e.shiftKey) {
      e.preventDefault();
      eventBusManager.debugBus.emit({
        type: "debug:inspector",
        scene
      });
    }
  };
  const _mountWindowEventListeners = () => {
    _handleResize();
    window.addEventListener("resize", _handleResize);
    window.addEventListener("keydown", _handleDebug);
  };
  const mount = async () => {
    _mountWindowEventListeners();
    gameplay.mount({
      renderer,
      scene,
      camera,
      controls
    });
    engineInstance.register(gameplay.update);
    loaderInstance.configure();
    await loaderInstance.loadAll();
  };
  const unmount = () => {
    window.removeEventListener("resize", _handleResize);
    window.removeEventListener("keydown", _handleDebug);
  };
  const update = () => {
    engineInstance.render();
  };
  return {
    mount,
    unmount,
    update
  };
};

export {
  createGameManager
};
//# sourceMappingURL=chunk-SG2G6X6H.js.map