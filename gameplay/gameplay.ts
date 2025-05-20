import { getGlobalContext } from "@utils/globalContext";
import {
  getThreeJsContext,
  ThreeJsContextManager,
} from "graphics/internal/context";
import { Clock, Euler, Vector3 } from "three";
import { ControllerManger, getControllers } from "./controllers/controller";
import { CameraControls, createCameraControls } from "./modules/camera";
import { createGround, Ground, GroundProps } from "./modules/ground";
import { createPlayer, Player, PlayerProps } from "./modules/player";

export interface GameplayOptions {
  player: PlayerProps;
  ground: GroundProps;
}

export interface Gameplay {
  mount: () => void;
  update: () => void;
  unmount: () => void;
}

interface References {
  player: Player;
  camera: CameraControls;
  ground: Ground;
  controllers: ControllerManger;
}

interface State {
  deltaTime: number;
  mouseRotation: {
    yaw: number;
    pitch: number;
  };
  camera: {
    rotation: Euler;
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
  let contextManager: ThreeJsContextManager;
  let references: References;

  //Re usable state (no re-allocation)
  let state: State = {
    deltaTime: 0,
    mouseRotation: {
      yaw: 0,
      pitch: 0,
    },
    camera: {
      rotation: new Euler(0, 0, 0, "XYZ"),
    },
  };

  let tempData: TempData = {
    deltaTime: 0,
    playerData: null,
  };

  const mount = (): void => {
    contextManager = getThreeJsContext();

    const controllers: ControllerManger = getControllers();
    controllers.mount({
      mouse: {
        sensitivity: 0.01,
      },
    });

    const player = createPlayer({
      ids: options.player.ids,
    });
    player.create();

    const camera = createCameraControls({
      camera: contextManager.getProperty("camera"),
    });

    const ground = createGround(options.ground);
    ground.mount();

    references = { player, camera, ground, controllers };
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
      state.mouseRotation,
      state.camera
    );

    state.camera = references.camera.update(
      tempData.playerData.position,
      state.mouseRotation
    );

    references.ground.update();
  };

  const unmount = () => {
    references.player.destroy();
    references.controllers.unmount();
    references.ground.unmount();
    contextManager.unmount();

    ///De reference
    references = null!;
    contextManager = null!;
  };

  return {
    mount: mount,
    update: update,
    unmount: unmount,
  };
};
