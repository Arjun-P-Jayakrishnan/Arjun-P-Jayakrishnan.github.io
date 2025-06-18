import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { Group, Object3DEventMap } from "three";
import { ModelIdentifier, Room, RoomProps } from "types/rooms.types";
import { CameraManager, createCameraManager } from "./camera";
import { createGround, Ground } from "./ground";
import { createLighting, Lighting } from "./lights";
import { createPlayer, Player } from "./player";

export interface ProjectRoomProps extends RoomProps {
  player: ModelIdentifier;
  ground: ModelIdentifier;
}

interface Components {
  camera: CameraManager;
  player: Player;
  ground: Ground;
  lighting: Lighting;
}

export const createProjectRoom = ({
  player,
  ground,
}: ProjectRoomProps): Room => {
  //====References===
  const serviceRegistry = getServiceRegistry();
  const [storage, context, eventBusManager, logger] = [
    serviceRegistry.get("GlobalStorageManager"),
    serviceRegistry.get("ThreeJSContextManager"),
    serviceRegistry.get("EventBusManager"),
    serviceRegistry.get("Logger"),
  ];

  const { scene, camera, orbit, renderer } = {
    scene: context.get("scene")!,
    camera: context.get("camera")!,
    orbit: context.get("orbit")!,
    renderer: context.get("renderer")!,
  };

  //===Local===
  const components: Components = {
    camera: createCameraManager({
      camera,
      eventBusManager,
      orbit,
      scene,
    }),
    player: createPlayer({ logger, reference: player, storage }),
    ground: createGround({ logger, reference: ground, storage }),
    lighting: createLighting({ renderer, scene }),
  };
  let group: Nullable<Group<Object3DEventMap>> = null;

  const mount = () => {
    components.ground.mount();
    components.player.mount();
    components.camera.mount();
    components.lighting.mount();

    group =
      storage.getStorage("model").retrieve(ground.storageId)?.groups ?? null;

    logger.onMount({ origin: "Projects-Room" });
  };

  const activate = () => {
    if (group) group.visible = true;

    components.camera.activate();
    components.ground.actiavte();
    components.lighting.activate();
    components.player.activate();

    logger.onActivate({ origin: "Projects-Room" });
  };

  const update = (deltaTime: number) => {
    components.player.update(deltaTime);
    components.camera.update(deltaTime);
  };

  const deactivate = () => {
    if (group) group.visible = false;

    components.camera.deactivate();
    components.ground.deactivate();
    components.lighting.deactivate();
    components.player.deactiavte();

    logger.onDeactivate({ origin: "Projects-Room" });
  };

  const unmount = () => {
    components.camera.unmount();
    components.ground.unmount();
    components.lighting.unmount();
    components.player.unmount();

    logger.onUnmount({ origin: "Projects-Room" });
  };

  return {
    mount: mount,
    setActive: activate,
    update: update,
    setDeactive: deactivate,
    unmount: unmount,
    isLoaded: false,
  };
};
