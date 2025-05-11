import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { GlobalState } from "@utils/state/globalState";
import { Camera, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface GameplayOptions {}

export interface GameplayContext {
  globalState: GlobalState;
  eventBusManager: EventBusManager;
}

export interface ThreeJSContext {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: Camera;
  controls:OrbitControls
}

export interface Gameplay {
  mount: (context: ThreeJSContext) => void;
  update: () => void;
  unmount: () => void;
}

export const createGameplay = (
  options: GameplayOptions,
  context: GameplayContext
): Gameplay => {
  const mount = (context: ThreeJSContext) => {};

  const update = () => {};

  const unmount = () => {};

  return {
    mount: mount,
    update: update,
    unmount: unmount,
  };
};
