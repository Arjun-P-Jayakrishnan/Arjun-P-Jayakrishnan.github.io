import { ModelAssetDescriptor } from "types/loader.types";
import { RoomAsset } from "types/rooms.types";

const FILE_CONSTANTS = {
  PATH_TO_MODELS: "../../../assets/Models/",
  PATH_TO_HDR: "../../../assets/HDR/",
  PATH_TO_ANIMATIONS: "../../../assets/Animations/",
};

export const PLAYER_ASSET: ModelAssetDescriptor = {
  id: "player",
  path: FILE_CONSTANTS.PATH_TO_MODELS + "player.glb",
  type: "glb",
};

export const NAVIGATION_ROOM_ASSETS: RoomAsset = {
  meshes: [
    {
      id: "room",
      path: FILE_CONSTANTS.PATH_TO_MODELS + "room.glb",
      type: "glb",
    },
  ],
  hdr: {
    id: "environment_hdr",
    path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
    type: "hdr",
  },
};

export const ABOUT_ROOM_ASSETS: RoomAsset = {
  meshes: [
    {
      id: "about",
      path: FILE_CONSTANTS.PATH_TO_MODELS + "about.glb",
      type: "glb",
    },
  ],
  hdr: {
    id: "environment_hdr",
    path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
    type: "hdr",
  },
};

export const PROJECTS_ROOM_ASSETS: RoomAsset = {
  meshes: [
    {
      id: "projects",
      path: FILE_CONSTANTS.PATH_TO_MODELS + "projects.glb",
      type: "glb",
    },
  ],
  hdr: {
    id: "environment_hdr",
    path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
    type: "hdr",
  },
};
