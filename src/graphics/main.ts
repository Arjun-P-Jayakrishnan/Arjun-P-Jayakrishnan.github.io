import { getGlobalContext } from "@utils/globalContext";

import { createGameplay, Gameplay } from "./gameplay/gameplay";
import { createThreeJsInstance } from "./internal/internal";
import { createLoader, LoaderOptions } from "./loader/loader";

interface GameManagerProps {
  loaderOptions: LoaderOptions;
}

export interface GameEngineManager {
  mount: () => void;
  unmount: () => void;
  update: () => void;
  load: () => Promise<void>;
}

export const createGameManager = (
  props: GameManagerProps
): GameEngineManager => {
  const { globalState, eventBusManager } = getGlobalContext();
  const engineInstance = createThreeJsInstance({
    camera: {},
    domMountTag: "game-engine",
  });
  const { scene, renderer, camera, controls } = engineInstance;

  const loaderInstance = createLoader(props.loaderOptions, {
    globalState: globalState,
    loaderEventBus: eventBusManager.loadingBus,
    renderer: renderer,
    scene: scene,
  });

  const gameplay: Gameplay = createGameplay({
    player: {
      ids: {
        rootMesh: "player",
      },
    },
    ground: {
      ids: {
        groundRoot: "ground",
      },
    },
  });

  /**
   * @description handle resize of the canvas
   */
  const _handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };

  const _handleDebug = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === "u" && e.shiftKey) {
      e.preventDefault();
      eventBusManager.debugBus.emit({
        type: "debug:inspector",
        scene: scene,
      });
    }
  };

  /**
   * @description creates event listeners for various tasks
   */
  const _mountWindowEventListeners = () => {
    /**
     * Primary initialization to ensure correct aspect ratios
     */
    _handleResize();

    window.addEventListener("resize", _handleResize);
    window.addEventListener("keydown", _handleDebug);
  };

  const mount = () => {
    /**
     * Attach Event Listeners
     */
    _mountWindowEventListeners();
    engineInstance.mount();

    /**
     * load all meshes ,objects and animations as per the given props
     */
    loaderInstance.configure();
  };

  const _onLoad = () => {
    /**
     * Initialize the gameplay mechanics and then pass update logic to renderer
     */
    gameplay.mount();

    /**
     * Register gameplay loop
     */
    engineInstance.register(gameplay.update);
  };

  const load = async () => {
    await loaderInstance.loadAll();

    _onLoad();
  };

  /**
   * @description unmount
   */
  const unmount = () => {
    /**
     * Release all event listeners to prevent memory leaks
     */
    window.removeEventListener("resize", _handleResize);
    window.removeEventListener("keydown", _handleDebug);
  };

  const update = () => {
    engineInstance.render();
  };

  return {
    mount: mount,
    unmount: unmount,
    update: update,
    load: load,
  };
};
