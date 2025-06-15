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
import { createGround, Ground, GroundProps } from "./ground";
import { createLighting, Lighting } from "./lights";
import { createPlayer, Player, PlayerProps } from "./player";

export interface AboutRoomProps {
  storageId: string;
  player: PlayerProps;
  ground: GroundProps;
}

interface Components {
  camera: CameraManager;
  player: Player;
  ground: Ground;
  lighting: Lighting;
}

export const createAboutRoom = (props: AboutRoomProps): Room => {
  //====References===
  const context: ThreeJsContextManager = getThreeJsContext();
  const { globalStorage } = getGlobalContext();
  const { scene, camera, orbit } = {
    scene: context.get("scene"),
    camera: context.get("camera"),
    orbit: context.get("orbit"),
  };

  //===Local===
  const components: Components = {
    camera: createCameraManager({ camera: camera, scene: scene }),
    player: createPlayer(props.player),
    ground: createGround(props.ground),
    lighting: createLighting(),
  };

  let group: Nullable<Group<Object3DEventMap>> = null;

  const mount = () => {
    processPipelineDebugger.onMount("about-room");
    components.ground.mount();
    components.player.mount();
    components.camera.mount();
    components.lighting.mount();
    group =
      globalStorage.getStorage(props.storageId).retrieve(props.storageId)
        ?.groups ?? null;
  };

  const activate = () => {
    if (group) group.visible = true;

    processPipelineDebugger.onInit("about-room-init");
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
