import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { getGlobalContext } from "@utils/globalContext";
import { GlobalState } from "@utils/state/globalState";
import { Camera, Clock, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createPlayer, Player, PlayerProps } from "./player";

export interface GameplayOptions {
  player: PlayerProps;
}

export interface GameplayContext {
  globalState: GlobalState;
  eventBusManager: EventBusManager;
}

export interface ThreeJSContext {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: Camera;
  controls: OrbitControls;
}

export interface Gameplay {
  mount: (context: ThreeJSContext) => void;
  update: () => void;
  unmount: () => void;
}

interface References {
  player: Player;
}

interface State {
  deltaTime: number;
}

interface TempData {
  deltaTime: number;
}

export const createGameplay = (options: GameplayOptions): Gameplay => {
  const { globalState, eventBusManager, globalStorage } = getGlobalContext();

  let state: State = {
    deltaTime: 0,
  };
  let references: References;
  let context: ThreeJSContext;
  let clock: Clock = new Clock();
  let tempData: TempData = {
    deltaTime: 0,
  };

  const mount = (_context: ThreeJSContext) => {
    const player = createPlayer(
      {
        ids: options.player.ids,
      },
      {
        scene: _context.scene,
      }
    );
    player.create();

    references = {
      player: player,
    };

    context = _context;
  };

  const updateDeltaTime = () => {
    tempData.deltaTime = clock.getDelta();

    if (!isNaN(tempData.deltaTime)) {
      state.deltaTime = tempData.deltaTime;
    }
  };

  const update = () => {
    updateDeltaTime();
    references.player.update(state.deltaTime);
  };

  const unmount = () => {
    references.player.destroy();
  };

  return {
    mount: mount,
    update: update,
    unmount: unmount,
  };
};
