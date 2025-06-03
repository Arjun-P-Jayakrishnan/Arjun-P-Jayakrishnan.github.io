
import { getThreeJsContext, ThreeJsContext, ThreeJsContextManager } from "core/game_engine/game_context";
import {  CameraManager, createCameraManager,  } from "./camera";
import { Room } from "gameplay/controller/room_types";
import { processPipelineDebugger } from "debug/debugger";
import { createPlayer, Player, PlayerProps } from "./player";
import { createGround, Ground, GroundProps } from "./ground";
import { createLighting, Lighting } from "./lights";

export interface AboutRoomProps {
  player:PlayerProps
  ground:GroundProps
}

interface Components {
  camera: CameraManager;
  player:Player;
  ground:Ground;
  lighting:Lighting;
}

export const createAboutRoom = (props: AboutRoomProps): Room => {
  //====References===
  const context:ThreeJsContextManager=getThreeJsContext();
  const { scene, camera,orbit } = { scene: context.get("scene"), camera: context.get("camera"),orbit:context.get('orbit')};

  //===Local===
  const components: Components = {
    camera: createCameraManager({ camera: camera, scene: scene,}),
    player:createPlayer(props.player),
    ground:createGround(props.ground),
    lighting:createLighting()
  };

  const mount = () => {
    processPipelineDebugger.onMount('about-room')
    components.ground.mount();
    components.player.mount();
    components.camera.mount();
    components.lighting.mount();
   
  };

  const activate = () => {
    processPipelineDebugger.onInit('about-room-init')
    components.camera.activate();
    components.ground.actiavte();
    components.lighting.activate();
    components.player.activate();
    orbit.enabled=false;
  };

  const update = (deltaTime: number) => {
    // components.camera.update(deltaTime);
  };

  const deactivate = () => {
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
    isLoaded:false
  };
};
