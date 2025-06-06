import { getGlobalContext } from "managers/globalContext";
import { createThreeJsInstance } from "./game_engine";
import { getThreeJsContext, ThreeJsContext } from "./game_context";
import { createGameplay, Gameplay } from "gameplay/gameplay";
import { processPipelineDebugger } from "debug/debugger";
import { LifeCycle, Nullable } from "@utils/types/lifecycle";

export interface GameEngineManager extends LifeCycle {
  update: () => void;
  load: () => Promise<void>;
}

export const createGameManager = (): GameEngineManager => {
  //Reference to global managers
  const { globalState, eventBusManager } = getGlobalContext();
  let isMounted: boolean = false;

  const engine = createThreeJsInstance({ domMountId: "game-engine" });
  const gameplay: Gameplay = createGameplay();
  let context: Nullable<ThreeJsContext> = null;

  /** Resises Camera and Renderer on window resise */
  const handleResize = () => {
    if (!context) return;

    const { height, width } = {
      height: window.innerHeight,
      width: window.innerWidth,
    };

    console.log("resising");
    context.camera.aspect = width / height;
    context.camera.updateProjectionMatrix();
    context.renderer.setSize(width, height);
  };

  const handleDebug = (e: KeyboardEvent) => {
    if (!context || !(e.key.toLowerCase() === "u" && e.shiftKey)) return;

    e.preventDefault();
    eventBusManager.debugBus.emit({
      type: "debug:inspector",
      scene: context.scene,
    });
  };

  /** Adds required event listeners */
  const addEventListeners = () => {
    /**
     * Primary initialization to ensure correct aspect ratios
     */
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleDebug);
  };

  /** Release all event listeners to prevent memory leaks */
  const removeEventListeners = () => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("keydown", handleDebug);
  };

  const initializeContext = () => {
    const ctx = getThreeJsContext();

    context = {
      scene: ctx.get("scene"),
      camera: ctx.get("camera"),
      renderer: ctx.get("renderer"),
      orbit: ctx.get("orbit"),
    };
  };

  const mount = () => {
    if (isMounted) return;

    engine.mount();
    initializeContext();
    addEventListeners();

    isMounted = true;
    processPipelineDebugger.onMount("game-engine");
  };

  const load = async () => {
    if (!isMounted) {
      throw new Error(`Try to load before mounting`);
    }
    processPipelineDebugger.onLoad("game-engine");
    try {
      await gameplay.mount(); // gameplay logic added after obtaining all assets
      engine.register(gameplay.update); // pass the gameplay loop as callback to the game engine
    } catch (error) {
      console.error(`[Game Manager] Loading failed :${error}`);
    }
  };

  const update = () => {
    engine.render();
  };

  const unmount = () => {
    if (!isMounted) return;
    processPipelineDebugger.onUnmount("game-engine");

    removeEventListeners();

    gameplay.unmount();
    engine.unmount();

    context = null;
    isMounted = false;
  };

  return {
    mount: mount,
    unmount: unmount,
    update: update,
    load: load,
  };
};
