import { GameplayOptions } from "graphics/gameplay/gameplay";
import { AssetMetaData } from "graphics/loader/loaderPlugins";
import { GameManagerProps } from "graphics/main";

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

export const GAME_MANAGER_PROPS: GameManagerProps = {
  loaderOptions: {
    meshesMetaData: assetMetaData.meshes,
    hdrMetaData: assetMetaData.hdr,
  },
};

export const GAMEPLAY_OPTIONS: GameplayOptions = {
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
