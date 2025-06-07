import { getGlobalContext } from "managers/globalContext";
import { createGround, Ground, GroundProps } from "./ground";
import { createPlayer, Player, PlayerProps } from "./player";
import {
  ControllerManger,
  getControllers,
} from "graphics/mechanics/controllers/controller";
import { ObjectStorageUnit } from "@managers/storage/storageTypes";
import {
  getThreeJsContext,
  ThreeJsContextManager,
} from "core/game_engine/game_context";
import { CameraManager, createCameraManager } from "./camera";
import { processPipelineDebugger } from "debug/debugger";
import { Nullable } from "@utils/types/lifecycle";
import { Room } from "@utils/types/room";
import { Euler, Vector3 } from "three";

export interface NavigationRoomProps {
  storageId: string;
  player: PlayerProps;
  ground: GroundProps;
}

interface Entities {
  player: Player;
  ground: Ground;
  camera: CameraManager;
  controllers: ControllerManger;
}

interface InternalState {
  player: {
    position: Vector3;
    rotation: Euler;
    rotationDelta: { yaw: number; pitch: number };
  };
}

interface TempData {}

export const createNavigationRoom = (props: NavigationRoomProps): Room => {
  //External dependencies
  const { globalStorage } = getGlobalContext();
  let contextManager: ThreeJsContextManager = getThreeJsContext();

  //Internal
  let components: Nullable<Entities> = {
    camera: createCameraManager({ camera: contextManager.get("camera") }),
    player: createPlayer({ rootMeshId: props.player.rootMeshId }),
    ground: createGround(props.ground),
    controllers: getControllers(),
  };

  //TODO:no idea on what to add yet
  let state: Nullable<InternalState> = null;
  //TODO: no idea what temporary data to add yet
  let tempData: Nullable<TempData> = null;

  let room: Nullable<ObjectStorageUnit> = null;
  let isMounted: boolean = false;

  const activate = () => {
    if (!room || !components) return;
    room.groups.visible = true;
    contextManager.get("orbit").enabled = false;

    components.camera.activate();
    components.ground.activate();
    components.player.activate();
  };

  const deactivate = () => {
    if (!room || !components) return;
    room.groups.visible = false;

    components.camera.deactivate();
    components.ground.deactivate();
    components.player.deactivate();
  };

  const mount = () => {
    if (isMounted || !components) return;

    processPipelineDebugger.onMount("Navigation Room");
    state = {
      player: {
        position: new Vector3(0, 0, 0),
        rotation: new Euler(0, 0, 0),
        rotationDelta: { yaw: 0, pitch: 0 },
      },
    };

    //get base root i.e group so that it can be used to toggle visibility
    room =
      globalStorage.getStorage(props.storageId).retrieve(props.storageId) ??
      null;

    components.controllers.mount({
      mouse: { sensitivity: { pitch: 0.001, yaw: 0.0009 } },
    });
    components.player.mount();
    components.ground.mount();
    components.camera.mount();

    isMounted = true;
  };

  const update = (deltaTime: number) => {
    if (!isMounted || !components || !state) return;
    contextManager.get("orbit").update();
    state.player = components.player.update(deltaTime);
    components.camera.update({
      playerPosition: state.player.position,
      rotationDelta: state.player.rotationDelta,
    });

    //entities.ground.update();
  };

  const unmount = () => {
    if (!isMounted || !components) return;

    processPipelineDebugger.onUnmount("Navigation Room");

    components.player.unmount();
    components.controllers.unmount();
    components.ground.unmount();
    contextManager.unmount();

    components = null;
    room = null;
  };

  return {
    mount: mount,
    update: update,
    unmount: unmount,
    setActive: activate,
    setDeactive: deactivate,
    isLoaded: false,
  };
};
