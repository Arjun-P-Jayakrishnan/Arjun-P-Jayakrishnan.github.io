import {
  createGameplay
} from "./chunk-PZE7PZZ4.js";
import {
  createThreeJsInstance
} from "./chunk-HE3AK42F.js";
import {
  createLoader
} from "./chunk-65NZVKWT.js";
import {
  getGlobalContext
} from "./chunk-SST3M2JD.js";

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
  const mount = () => {
    _mountWindowEventListeners();
    engineInstance.mount();
    loaderInstance.configure();
  };
  const _onLoad = () => {
    gameplay.mount({
      renderer,
      scene,
      camera,
      controls
    });
    engineInstance.register(gameplay.update);
  };
  const load = async () => {
    await loaderInstance.loadAll();
    _onLoad();
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
    update,
    load
  };
};

export {
  createGameManager
};
//# sourceMappingURL=chunk-2XEB47CF.js.map