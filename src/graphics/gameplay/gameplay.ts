import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { getGlobalContext } from "@utils/globalContext";
import { GlobalState } from "@utils/state/globalState";
import { Camera, Scene, WebGLRenderer } from "three";
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

export const createGameplay = (options: GameplayOptions): Gameplay => {
  const { globalState, eventBusManager, globalStorage } = getGlobalContext();

  let references: References;

  const mount = (context: ThreeJSContext) => {
    const player = createPlayer(
      {
        ids: options.player.ids,
      },
      {
        scene: context.scene,
      }
    );
    player.create();

    references = {
      player: player,
    };
  };

  const update = () => {
    references.player.update(0);
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
