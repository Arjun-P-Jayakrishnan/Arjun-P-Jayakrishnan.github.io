import {  Rooms } from "./lifecycle";
import { RoomProps } from "./room/room";

export const ROOM_OPTIONS: RoomProps = {
  player: {
    ids: {
      rootMesh: "player",
    },
  },
  ground: {
    ids: {
      groundRoot: "ground",
    },
  },
};


export interface NavigationRoom extends Rooms{}

export interface AboutRoom extends Rooms{}