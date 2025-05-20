import { getGlobalContext } from "@utils/globalContext";
import { GAMEPLAY_OPTIONS } from "config/assets";
import { createGameplay, Gameplay } from "../../gameplay/gameplay";
import { getThreeJsContext, ThreeJsContext } from "./internal/context";
import { createThreeJsInstance } from "./internal/internal";
import { createLoader, Loader, LoaderOptions } from "./loader/loader";

export interface GameManagerProps {
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
  let flags = {
    isMounted: false,
  };

  const engineInstance = createThreeJsInstance({
    camera: {},
    domMountTag: "game-engine",
  });

  const gameplay: Gameplay = createGameplay(GAMEPLAY_OPTIONS);

  let gameContext: ThreeJsContext | null = null;
  let loaderInstance: Loader | null = null;

  /**
   * @description handle resize of the canvas
   */
  const _handleResize = () => {
    if (!gameContext) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    gameContext.camera.aspect = width / height;
    gameContext.camera.updateProjectionMatrix();

    gameContext.renderer.setSize(width, height);
  };

  const _handleDebug = (e: KeyboardEvent) => {
    if (!gameContext) return;

    if (e.key.toLowerCase() === "u" && e.shiftKey) {
      e.preventDefault();
      eventBusManager.debugBus.emit({
        type: "debug:inspector",
        scene: gameContext.scene,
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

  const _getContext = () => {
    gameContext = {
      scene: getThreeJsContext().getProperty("scene"),
      camera: getThreeJsContext().getProperty("camera"),
      renderer: getThreeJsContext().getProperty("renderer"),
      orbit: getThreeJsContext().getProperty("orbit"),
    };

    loaderInstance = createLoader(props.loaderOptions, {
      globalState: globalState,
      loaderEventBus: eventBusManager.loadingBus,
      renderer: gameContext.renderer,
      scene: gameContext.scene,
    });
  };

  const mount = () => {
    if (flags.isMounted) return;

    engineInstance.mount();

    _getContext();
    /**
     * Attach Event Listeners
     */
    _mountWindowEventListeners();

    /**
     * load all meshes ,objects and animations as per the given props
     */
    loaderInstance!.configure();

    flags.isMounted = true;
  };

  const update = () => {
    engineInstance.render();
  };

  /**
   * @description unmount
   */
  const unmount = () => {
    if (!flags.isMounted) return;
    /**
     * Release all event listeners to prevent memory leaks
     */
    window.removeEventListener("resize", _handleResize);
    window.removeEventListener("keydown", _handleDebug);

    if (gameplay) {
      gameplay.unmount();
    }

    engineInstance.dispose();

    if (loaderInstance) {
      loaderInstance.dispose();
      loaderInstance = null;
    }

    gameContext = null;

    flags.isMounted = false;
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
    try {
      if (!flags.isMounted) throw new Error(`Try to load before mounting`);

      await loaderInstance!.loadAll();

      _onLoad();
    } catch (err) {
      console.error(`Error while loading :${err}`);
    }
  };

  return {
    mount: mount,
    unmount: unmount,
    update: update,
    load: load,
  };
};
