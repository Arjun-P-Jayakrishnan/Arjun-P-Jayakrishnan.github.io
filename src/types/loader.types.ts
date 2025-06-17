type ModelTypes = "glb" | "fbx" | "hdr";

type ModelAssetDescriptor = {
  id: string;
  type: ModelTypes;
  path: string;
};

export type LoadOptions = ModelAssetDescriptor[];

export type { ModelAssetDescriptor, ModelTypes };
