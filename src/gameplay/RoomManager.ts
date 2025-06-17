import {
  ABOUT_ROOM_ASSETS,
  NAVIGATION_ROOM_ASSETS,
  PLAYER_ASSET,
  PROJECTS_ROOM_ASSETS,
} from "config/asset_manifest";
import {
  ABOUT_ROOM_OPTIONS,
  NAVIGATION_ROOM_OPTIONS,
  PROJECTS_ROOM_OPTIONS,
} from "config/rooms";
import { createLoader, Loader } from "engine/core/LoadingManager";
import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { createAboutRoom } from "gameplay/rooms/about/room";
import { createNavigationRoom } from "gameplay/rooms/navigation/room";
import { createProjectRoom } from "gameplay/rooms/projects/room";
import { Room, RoomAsset } from "types/rooms.types";

export interface RoomController {
  mount: () => Promise<void>;
  switchRoom: Record<RoomKey | "default", () => void>;
  update: (deltaTime: number) => void;
  unmount: () => void;
}

type RoomKey = "navigation" | "about" | "projects";

type RoomMap = {
  [key in RoomKey]: Nullable<Room>;
};

type RoomAssetsMap = {
  [key in RoomKey]: RoomAsset;
};

export const createRoomController = (): RoomController => {
  const serviceRegistry = getServiceRegistry();
  const [storage, logger, eventBusManager, contextManager, stateManager] = [
    serviceRegistry.get("GlobalStorageManager"),
    serviceRegistry.get("Logger"),
    serviceRegistry.get("EventBusManager"),
    serviceRegistry.get("ThreeJSContextManager"),
    serviceRegistry.get("GlobalStateManager"),
  ];

  let loader: Nullable<Loader> = null;
  let rooms: RoomMap = { navigation: null, about: null, projects: null };
  let roomAssets: RoomAssetsMap = {
    navigation: NAVIGATION_ROOM_ASSETS,
    about: ABOUT_ROOM_ASSETS,
    projects: PROJECTS_ROOM_ASSETS,
  };
  let activeRoom: Nullable<Room> = null;
  let activeRoomKey: Nullable<RoomKey> = null;

  const initializeLoader = (): void => {
    try {
      loader = createLoader({
        storageManager: storage,
        stateManager: stateManager,
        loaderEventBus: eventBusManager.loadingBus,
        renderer: contextManager.get("renderer")!,
        scene: contextManager.get("scene")!,
      });
      loader?.configure();
    } catch (err) {
      throw new Error(
        `[Gameplay] Couldnt create and initailize the loader due to ${err}`
      );
    }
  };

  const instantiateRoom = (key: RoomKey): Room => {
    switch (key) {
      case "navigation":
        rooms[key] = createNavigationRoom(NAVIGATION_ROOM_OPTIONS);
        return rooms[key]!;
      case "about":
        rooms[key] = createAboutRoom(ABOUT_ROOM_OPTIONS);
        return rooms[key]!;
      case "projects":
        rooms[key] = createProjectRoom(PROJECTS_ROOM_OPTIONS);
        return rooms[key]!;
      default:
        throw new Error(`Unknown Room key ${key}`);
    }
  };

  const loadRoom = async (key: RoomKey) => {
    if (!loader) return;

    const assets = roomAssets[key];
    if (!assets)
      throw new Error(
        "[Room Controller] sufficient asset meta data is not given."
      );

    if (!rooms[key]) {
      const room: Room = instantiateRoom(key);

      console.log("load room", roomAssets[key]);

      const loadItems = [...roomAssets[key].meshes];
      if (roomAssets[key].hdr) loadItems.push(roomAssets[key].hdr);

      //Load only once
      await loader.load(loadItems);

      if (room) {
        room.mount();
        room.isLoaded = true;
        activeRoom = room;
      }
    }
  };

  const switchRoom = async (key: RoomKey): Promise<void> => {
    if (activeRoomKey === key) return;

    if (activeRoomKey != null) {
      if (rooms[activeRoomKey] != null) rooms[activeRoomKey]!.setDeactive();
    }

    await loadRoom(key);

    if (rooms[key]) rooms[key].setActive();
    activeRoomKey = key;
  };

  const mount = async (): Promise<void> => {
    logger.onMount({ origin: "Room Controller" });
    initializeLoader();
    await loader?.load([PLAYER_ASSET]);
    await loadRoom("navigation");
    await switchRoom("navigation");
  };

  const update = (deltaTime: number) => {
    activeRoom?.update(deltaTime);
  };

  const unmount = (): void => {
    loader?.dispose();

    Object.values(rooms).forEach((room) => {
      room?.unmount();
    });

    logger.onUnmount({ origin: "room-controller" });
  };

  const transitionRooms = (key: RoomKey) => {
    eventBusManager.loadingBus.emit({
      type: "load:start",
      loaded: 0,
      total: 0,
      url: "",
    });

    Promise.allSettled([switchRoom(key)]).then(() => {
      eventBusManager.loadingBus.emit({ type: "load:complete" });
    });
  };

  const deactivateRoom = () => {
    if (!activeRoomKey) return;

    activeRoom?.setDeactive();
  };

  return {
    mount: mount,
    switchRoom: {
      navigation: () => transitionRooms("navigation"),
      about: () => transitionRooms("about"),
      projects: () => transitionRooms("projects"),
      default: () => deactivateRoom(),
    },
    update: update,
    unmount: unmount,
  };
};
