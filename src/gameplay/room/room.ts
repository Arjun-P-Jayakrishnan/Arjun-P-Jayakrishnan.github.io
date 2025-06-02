
import { getGlobalContext } from "managers/globalContext";
import { Euler, Vector3 } from "three";
import { CameraControls, createCameraControls } from "./camera";
import { createGround, Ground, GroundProps } from "./ground";
import { createPlayer, Player, PlayerProps } from "./player";
import { ControllerManger, getControllers } from "graphics/mechanics/controllers/controller";
import { getThreeJsContext, ThreeJsContextManager } from "core/game_engine/game_context";
import { ObjectStorageUnit } from "@managers/storage/storageTypes";
import { NavigationRoom } from "gameplay/configs";
import { Room } from "gameplay/controller/room_types";

export interface RoomProps {
  player: PlayerProps;
  ground: GroundProps;
}



interface References {
  player: Player;
  camera: CameraControls;
  ground: Ground;
  controllers: ControllerManger;
}

interface State {
  mouseRotation: {
    yaw: number;
    pitch: number;
  };
  camera: {
    rotation: Euler;
  };
}

interface TempData {
  playerData: {
    position: Vector3;
    rotation: Euler;
  } | null;
}

export const createNavigationRoom = (props: RoomProps): Room => {
  const { globalStorage } = getGlobalContext();
  let contextManager: ThreeJsContextManager;

  let references: References;
  let state: State = {
    mouseRotation: {
      yaw: 0,
      pitch: 0,
    },
    camera: {
      rotation: new Euler(0, 0, 0, "XYZ"),
    },
  };

  let tempData: TempData = {
    playerData: null,
  };
  let room: ObjectStorageUnit | null = null;

  const activate = () => {
    // if (!room) return;
    // room.groups.visible = true;
  };

  const deactivate = () => {
    // console.log("room deactivated?", room);
    // if (!room) return;
    // room.groups.visible = false;
  };

  const mount = () => {
    // contextManager = getThreeJsContext();

    // room = globalStorage.getStorage("room").retrieve("room") ?? null;

    // const controllers: ControllerManger = getControllers();
    // controllers.mount({
    //   mouse: {
    //     sensitivity: 0.01,
    //   },
    // });

    // const player = createPlayer({
    //   ids: props.player.ids,
    // });
    // player.create();

    // const camera = createCameraControls({
    //   camera: contextManager.get("camera"),
    // });

    // const ground = createGround(props.ground);
    // ground.mount();

    // references = { player, camera, ground, controllers };

    // deactivate();
  };

  const update = (deltaTime: number) => {
    // state.mouseRotation = references.controllers
    //   .getController("mouse")
    //   ?.getRotation()!;
    // tempData.playerData = references.player.update(
    //   deltaTime,
    //   state.mouseRotation,
    //   state.camera
    // );

    // state.camera = references.camera.update(
    //   tempData.playerData.position,
    //   state.mouseRotation
    // );

    // references.ground.update();
  };

  const unmount = () => {
    // references.player.destroy();
    // references.controllers.unmount();
    // references.ground.unmount();
    // contextManager.unmount();

    // ///De reference
    // references = null!;
    // contextManager = null!;
  };

  return {
    mount: mount,
    update: update,
    unmount: unmount,
    setActive: activate,
    setDeactive: deactivate,
    isLoaded:false
  };
};
