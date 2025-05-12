import { AssetMetaData } from "graphics/loader/loaderPlugins";

const FILE_CONSTANTS = {
  PATH_TO_MODELS: "../../assets/Models/",
  PATH_TO_HDR: "../../assets/HDR/",
};

export const assetMetaData: {
  meshes: AssetMetaData[];
  hdr?: AssetMetaData;
} = {
  meshes: [
    {
      name: "Room",
      path: FILE_CONSTANTS.PATH_TO_MODELS + "room.glb",
    },
  ],
  hdr: {
    name: "environment_hdr",
    path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
  },
};
