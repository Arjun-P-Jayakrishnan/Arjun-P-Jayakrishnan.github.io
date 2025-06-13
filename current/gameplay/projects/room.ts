import { getGlobalContext } from "@managers/globalContext";
import {
  getThreeJsContext,
  ThreeJsContextManager,
} from "core/game_engine/game_context";
import { processPipelineDebugger } from "debug/debugger";
import { Group, Object3DEventMap } from "three";
import { Nullable } from "../../../current/utils/types/lifecycle";
import { Room } from "../../../current/utils/types/room";
import { CameraManager, createCameraManager } from "./camera";
import { createGround, Ground } from "./ground";
import { createLighting, Lighting } from "./lights";
import { createPlayer, Player } from "./player";

export interface ProjectRoomProps {
  storageId: string;
  playerId: string;
  groundId: string;
}

interface Components {
  camera: CameraManager;
  player: Player;
  ground: Ground;
  lighting: Lighting;
}

export const createProjectRoom = ({
  groundId,
  playerId,
  storageId,
}: ProjectRoomProps): Room => {
  //====References===
  const { globalStorage } = getGlobalContext();
  const context: ThreeJsContextManager = getThreeJsContext();
  const { scene, camera, orbit } = {
    scene: context.get("scene"),
    camera: context.get("camera"),
    orbit: context.get("orbit"),
  };

  //===Local===
  const components: Components = {
    camera: createCameraManager({ camera: camera, scene: scene, orbit: orbit }),
    player: createPlayer({ storageId: storageId, rootMeshId: playerId }),
    ground: createGround({ groundId: groundId, storageId: storageId }),
    lighting: createLighting(),
  };
  let group: Nullable<Group<Object3DEventMap>> = null;

  const mount = () => {
    processPipelineDebugger.onMount("projects-room");
    components.ground.mount();
    components.player.mount();
    components.camera.mount();
    components.lighting.mount();

    group =
      globalStorage.getStorage(storageId).retrieve(storageId)?.groups ?? null;
  };

  const activate = () => {
    if (group) group.visible = true;

    processPipelineDebugger.onInit("projects-room-init");
    components.camera.activate();
    components.ground.actiavte();
    components.lighting.activate();
    components.player.activate();
  };

  const update = (deltaTime: number) => {
    // components.camera.update(deltaTime);
    components.player.update(deltaTime);
    components.camera.update(deltaTime);
    //orbit.update();
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
