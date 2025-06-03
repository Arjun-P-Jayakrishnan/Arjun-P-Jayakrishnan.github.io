import { AboutRoomProps } from "./about/room";
import {  Rooms } from "./lifecycle";
import { NavigationRoomProps } from "./navigation/room";


export const NAVIGATION_ROOM_OPTIONS: NavigationRoomProps = {
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
  player: {
    rootMeshId: "RootNode",
  },
  ground:{
     ids: {
      groundRoot: "ground",
    },
  }
};


export interface NavigationRoom extends Rooms{}

export interface AboutRoom extends Rooms{}