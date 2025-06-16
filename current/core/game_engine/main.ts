import { LifeCycle, Nullable } from "@utils/types/lifecycle";
import { processPipelineDebugger } from "debug/debugger";
import { createGameplay, Gameplay } from "gameplay/gameplay";
import { getGlobalContext } from "managers/globalContext";
import { getThreeJsContext, ThreeJsContext } from "./game_context";
import { createThreeJsInstance } from "./game_engine";

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
