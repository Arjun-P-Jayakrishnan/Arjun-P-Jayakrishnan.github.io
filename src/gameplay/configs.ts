import { AboutRoomProps } from "./about/room";
import {  Rooms } from "./lifecycle";
import { NavigationRoomProps } from "./navigation/room";
import { ProjectRoomProps } from "./projects/room";


export const NAVIGATION_ROOM_OPTIONS: NavigationRoomProps = {
  storageId:"room",
  player: {
    rootMeshId: "RootNode",
  },
  ground: {
    ids: {
      groundRoot: "ground",
    },
  },
};

export const ABOUT_ROOM_OPTIONS: AboutRoomProps = {
  storageId:'about',
  player: {
    rootMeshId: "RootNode",
  },
  ground:{
     ids: {
      groundRoot: "ground",
    },
  }
};

export const PROJECTS_ROOM_OPTIONS: ProjectRoomProps = {
  storageId:'projects',
  player: {
    rootMeshId: "RootNode",
  },
  ground:{
     ids: {
      groundRoot: "ground",
    },
  }
};
