import { AboutRoomProps } from "../about/room";
import { NavigationRoomProps } from "../navigation/room";
import { ProjectRoomProps } from "../projects/room";

export const NAVIGATION_ROOM_OPTIONS: NavigationRoomProps = {
  storageId: "room",
  player: {
    rootMeshId: "RootNode",
  },
  ground: {
    groundId: "ground",
    storageId: "room",
  },
};

export const ABOUT_ROOM_OPTIONS: AboutRoomProps = {
  storageId: "about",
  player: {
    rootMeshId: "RootNode",
  },
  ground: {
    groundId: "ground",
    storageId: "about",
  },
};

export const PROJECTS_ROOM_OPTIONS: ProjectRoomProps = {
  storageId: "projects",
  groundId: "ground",
  playerId: "RootNode",
};
