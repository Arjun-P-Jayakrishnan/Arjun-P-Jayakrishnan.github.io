import { Group, Object3DEventMap } from "three";

import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { ModelIdentifier, Room } from "types/rooms.types";
import { CameraManager, createCameraManager } from "./camera";
import { createGround, Ground } from "./ground";
import { createLighting, Lighting } from "./lights";
import { createPlayer, Player } from "./player";

export interface AboutRoomProps {
  player: ModelIdentifier;
  ground: ModelIdentifier;
}

interface Components {
  camera: CameraManager;
  player: Player;
  ground: Ground;
  lighting: Lighting;
}

export const createAboutRoom = ({ ground, player }: AboutRoomProps): Room => {
  //====References====
  const serviceRegistry = getServiceRegistry();
  const [storage, logger, context] = [
    serviceRegistry.get("GlobalStorageManager"),
    serviceRegistry.get("Logger"),
    serviceRegistry.get("ThreeJSContextManager"),
  ];

  const { scene, camera, orbit, renderer } = {
    scene: context.get("scene")!,
    camera: context.get("camera")!,
    orbit: context.get("orbit")!,
    renderer: context.get("renderer")!,
  };

  //===Local===
  const components: Components = {
    camera: createCameraManager({ camera: camera, scene: scene }),
    player: createPlayer({ logger, reference: player, scene, storage }),
    ground: createGround({ logger, reference: ground, storage }),
    lighting: createLighting({ renderer, scene }),
  };

  let group: Nullable<Group<Object3DEventMap>> = null;

  const mount = () => {
    logger.onMount({ origin: "about-room" });
    components.ground.mount();
    components.player.mount();
    components.camera.mount();
    components.lighting.mount();
    group =
      storage.getStorage("model").retrieve(ground.storageId)?.groups ?? null;
  };

  const activate = () => {
    if (group) group.visible = true;

    orbit.enabled = false;
    components.camera.activate();
    components.ground.actiavte();
    components.lighting.activate();
    components.player.activate();
  };

  const update = (deltaTime: number) => {
    // components.camera.update(deltaTime);
  };

  const deactivate = () => {
    if (group) group.visible = false;

    components.camera.deactivate();
    components.ground.deactivate();
    components.lighting.deactivate();
    components.player.deactiavte();
  };

  const unmount = () => {
    components.camera.unmount();
    components.ground.unmount();
    components.lighting.unmount();
    components.player.unmount();
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
