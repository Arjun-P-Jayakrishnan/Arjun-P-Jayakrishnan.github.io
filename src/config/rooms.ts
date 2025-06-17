import { AboutRoomProps } from "gameplay/rooms/about/room";
import { NavigationRoomProps } from "gameplay/rooms/navigation/room";
import { ProjectRoomProps } from "gameplay/rooms/projects/room";

export const NAVIGATION_ROOM_OPTIONS: NavigationRoomProps = {
  player: {
    id: "RootNode",
    storageId: "player",
  },
  ground: {
    id: "ground",
    storageId: "navigation",
  },
};

export const ABOUT_ROOM_OPTIONS: AboutRoomProps = {
  player: {
    id: "RootNode",
    storageId: "player",
  },
  ground: {
    id: "ground",
    storageId: "about",
  },
};

export const PROJECTS_ROOM_OPTIONS: ProjectRoomProps = {
  player: {
    id: "RootNode",
    storageId: "player",
  },
  ground: {
    id: "ground",
    storageId: "projects",
  },
};
