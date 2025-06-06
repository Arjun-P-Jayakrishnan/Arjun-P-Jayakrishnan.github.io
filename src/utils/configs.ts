import { ModelAssetDescriptor } from "./types/loading";
import { RoomAsset } from "./types/room";

const FILE_CONSTANTS = {
  PATH_TO_MODELS: "../../../assets/Models/",
  PATH_TO_HDR: "../../../assets/HDR/",
  PATH_TO_ANIMATIONS: "../../../assets/Animations/",
};

export const PLAYER_ASSET: ModelAssetDescriptor = {
  name: "player",
  path: FILE_CONSTANTS.PATH_TO_MODELS + "player.glb",
  loaderType: "glb",
};

export const NAVIGATION_ROOM_ASSETS: RoomAsset = {
  meshes: [
    {
      name: "room",
      path: FILE_CONSTANTS.PATH_TO_MODELS + "room.glb",
      loaderType: "glb",
    },
  ],
  hdr: {
    name: "environment_hdr",
    path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
    loaderType: "hdr",
  },
};

export const ABOUT_ROOM_ASSETS: RoomAsset = {
  meshes: [
    {
      name: "about",
      path: FILE_CONSTANTS.PATH_TO_MODELS + "about.glb",
      loaderType: "glb",
    },
  ],
  hdr: {
    name: "environment_hdr",
    path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
    loaderType: "hdr",
  },
};

export const PROJECTS_ROOM_ASSETS: RoomAsset = {
  meshes: [
    {
      name: "projects",
      path: FILE_CONSTANTS.PATH_TO_MODELS + "projects.glb",
      loaderType: "glb",
    },
  ],
  hdr: {
    name: "environment_hdr",
    path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
    loaderType: "hdr",
  },
};
