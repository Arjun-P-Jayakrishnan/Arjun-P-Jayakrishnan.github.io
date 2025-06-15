import { ModelAssetDescriptor } from "types/loader.types";

const PATH_TO_MODELS = "../../../assets/Models/";
const PATH_TO_HDR = "../../../assets/HDR/";
const PATH_TO_ANIMATIONS = "../../../assets/Animations/";

const models: Record<string, ModelAssetDescriptor> = {
  player: {
    type: "glb",
    path: PATH_TO_MODELS + "",
  },
};
