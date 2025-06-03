
import { getGlobalContext } from "managers/globalContext";
import { createGround, Ground, GroundProps } from "./ground";
import { createPlayer, Player, PlayerProps } from "./player";
import { ControllerManger, getControllers } from "graphics/mechanics/controllers/controller";
import { ObjectStorageUnit } from "@managers/storage/storageTypes";
import { Room } from "gameplay/controller/room_types";
import { getThreeJsContext, ThreeJsContextManager } from "core/game_engine/game_context";
import { CameraManager, createCameraManager } from "./camera";
import { Nullable } from "gameplay/lifecycle";
import { processPipelineDebugger } from "debug/debugger";

export interface NavigationRoomProps {
  player: PlayerProps;
  ground: GroundProps;
}


interface Entities {
  player: Player;
  ground: Ground;
  camera: CameraManager;
  controllers: ControllerManger;
}

interface InternalState {}

interface TempData {}

export const createNavigationRoom = (props: NavigationRoomProps): Room => {
  //External dependencies
  const { globalStorage } = getGlobalContext();
  let contextManager: ThreeJsContextManager=getThreeJsContext();

  //Internal
  let entities: Nullable<Entities>=null;

  //TODO:no idea on what to add yet
  let state: Nullable<InternalState>=null; 
  //TODO: no idea what temporary data to add yet
  let tempData: Nullable<TempData>=null; 

  let room: Nullable<ObjectStorageUnit> = null;
  let isMounted:boolean=false;

  const activate = () => {
    if (!room) return;
    room.groups.visible = true;
  };

  const deactivate = () => {
    if (!room) return;
    room.groups.visible = false;
  };

  const mount = () => {
    if(isMounted) return;

    processPipelineDebugger.onMount('Navigation Room');

    contextManager = getThreeJsContext();

    //get base root i.e group so that it can be used to toggle visibility
    room = globalStorage.getStorage("room").retrieve("room") ?? null;

    const controllers: ControllerManger = getControllers();
    controllers.mount({ mouse: { sensitivity: 0.01, } });

    const player = createPlayer({ rootMeshId: props.player.rootMeshId });
    player.create();

    const camera = createCameraManager({camera: contextManager.get("camera")});

    const ground = createGround(props.ground);
    ground.mount();

    entities = { player, camera, ground, controllers };

    // //Ensure everything is deactivated first
    // deactivate();

    isMounted=true;
  };

  const update = (deltaTime: number) => {
    if(!isMounted || !entities) return;
    contextManager.get('orbit').update();
    //entities.ground.update();
  };

  const unmount = () => {
    if(!isMounted|| !entities) return;

    processPipelineDebugger.onUnmount('Navigation Room')

    entities.player.destroy();
    entities.controllers.unmount();
    entities.ground.unmount();
    contextManager.unmount();

    entities = null;
    room=null;
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
