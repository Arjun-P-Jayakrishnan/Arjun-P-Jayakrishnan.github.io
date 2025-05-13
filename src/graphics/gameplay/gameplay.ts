import { getGlobalContext } from "@utils/globalContext";
import {
  Clock,
  Euler,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CameraControls, createCameraControls } from "./camera";
import { ControllerManger, getControllers } from "./controllers/controller";
import { createPlayer, Player, PlayerProps } from "./player";

export interface GameplayOptions {
  player: PlayerProps;
}

export interface ThreeJSContext {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  controls: OrbitControls;
}

export interface Gameplay {
  mount: (context: ThreeJSContext) => void;
  update: () => void;
  unmount: () => void;
}

interface References {
  player: Player;
  camera: CameraControls;
  controllers: ControllerManger;
}

interface State {
  deltaTime: number;
  mouseRotation: {
    yaw: number;
    pitch: number;
  };
}

interface TempData {
  deltaTime: number;
  playerData: {
    position: Vector3;
    rotation: Euler;
  } | null;
}

export const createGameplay = (options: GameplayOptions): Gameplay => {
  //
  const { globalState, eventBusManager, globalStorage } = getGlobalContext();

  const clock: Clock = new Clock();
  let context: ThreeJSContext;
  let references: References;

  //Re usable state (no re-allocation)
  let state: State = {
    deltaTime: 0,
    mouseRotation: {
      yaw: 0,
      pitch: 0,
    },
  };

  let tempData: TempData = {
    deltaTime: 0,
    playerData: null,
  };

  const mount = (_context: ThreeJSContext): void => {
    context = _context;

    const controllers: ControllerManger = getControllers();
    controllers.mount({
      mouse: {
        sensitivity: 0.01,
      },
    });

    const player = createPlayer(
      {
        ids: options.player.ids,
      },
      {
        scene: _context.scene,
      }
    );
    player.create();

    const camera = createCameraControls({
      camera: _context.camera,
    });

    references = { player, camera, controllers };
  };

  const updateDeltaTime = (): void => {
    tempData.deltaTime = clock.getDelta();

    if (!isNaN(tempData.deltaTime)) {
      state.deltaTime = tempData.deltaTime;
    }
  };

  const update = () => {
    updateDeltaTime();
    state.mouseRotation = references.controllers
      .getController("mouse")
      ?.getRotation()!;
    tempData.playerData = references.player.update(
      state.deltaTime,
      state.mouseRotation
    );

    references.camera.update(tempData.playerData.position, state.mouseRotation);
  };

  const unmount = () => {
    references.player.destroy();
    references.controllers.unmount();

    ///De reference
    references = null!;
    context = null!;
  };

  return {
    mount: mount,
    update: update,
    unmount: unmount,
  };
};
