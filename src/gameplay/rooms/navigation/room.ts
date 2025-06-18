import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { InputManager } from "engine/managers/InputManager";
import { Euler, Vector3 } from "three";
import { ModelIdentifier, Room } from "types/rooms.types";
import { ObjectStorageUnit } from "types/storage.types";
import { CameraManager, createCameraManager } from "./camera";
import { createGround, Ground } from "./ground";
import { createPlayer, Player } from "./player";

export interface NavigationRoomProps {
  player: ModelIdentifier;
  ground: ModelIdentifier;
}

interface Entities {
  player: Player;
  ground: Ground;
  camera: CameraManager;
  inputs: InputManager;
}

interface InternalState {
  player: {
    position: Vector3;
    rotation: Euler;
    rotationDelta: { yaw: number; pitch: number };
  };
}

interface TempData {}

export const createNavigationRoom = ({
  player,
  ground,
}: NavigationRoomProps): Room => {
  //External dependencies
  const serviceRegistry = getServiceRegistry();

  const [logger, storage, eventBusManager, InputManager, contextManager] = [
    serviceRegistry.get("Logger"),
    serviceRegistry.get("GlobalStorageManager"),
    serviceRegistry.get("EventBusManager"),
    serviceRegistry.get("InputManager"),
    serviceRegistry.get("ThreeJSContextManager"),
  ];

  //Internal
  let components: Nullable<Entities> = {
    camera: createCameraManager({ camera: contextManager.get("camera")! }),
    player: createPlayer({
      reference: player,
      InputManager: InputManager,
      storage: storage,
    }),
    ground: createGround({
      camera: contextManager.get("camera")!,
      logger: logger,
      references: ground,
      storage: storage,
    }),
    inputs: InputManager,
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
    contextManager.get("orbit")!.enabled = false;

    components.camera.activate();
    components.ground.activate();
    components.player.activate();

    logger.onActivate({ origin: "Navigation-Room" });
  };

  const deactivate = () => {
    if (!room || !components) return;
    room.groups.visible = false;

    components.camera.deactivate();
    components.ground.deactivate();
    components.player.deactivate();
    logger.onDeactivate({ origin: "Navigation-Room" });
  };

  const mount = () => {
    if (isMounted || !components) return;

    logger.onMount({ origin: "Navigation Room" });
    state = {
      player: {
        position: new Vector3(0, 0, 0),
        rotation: new Euler(0, 0, 0),
        rotationDelta: { yaw: 0, pitch: 0 },
      },
    };

    //get base root i.e group so that it can be used to toggle visibility
    room = storage.getStorage("model").retrieve(ground.storageId) ?? null;

    components.player.mount();
    components.ground.mount();
    components.camera.mount();

    isMounted = true;
  };

  const update = (deltaTime: number) => {
    if (!isMounted || !components || !state) return;
    contextManager.get("orbit")!.update();
    state.player = components.player.update(deltaTime);
    components.camera.update({
      playerPosition: state.player.position,
      rotationDelta: state.player.rotationDelta,
    });

    //entities.ground.update();
  };

  const unmount = () => {
    if (!isMounted || !components) return;

    logger.onUnmount({ origin: "Navigation Room" });

    components.player.unmount();
    components.ground.unmount();

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
