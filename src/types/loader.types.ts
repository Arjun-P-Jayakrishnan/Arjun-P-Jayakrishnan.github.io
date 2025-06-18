type ModelTypes = "glb" | "fbx" | "hdr";

type ModelAssetDescriptor = {
  id: string;
  type: ModelTypes;
  path: string;
};

type LoadOptions = ModelAssetDescriptor[];

export type { LoadOptions, ModelAssetDescriptor, ModelTypes };
