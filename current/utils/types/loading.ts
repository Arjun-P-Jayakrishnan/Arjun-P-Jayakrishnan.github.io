//--Types-------------------------------------------------------------
export type ModelLoaderType = "fbx" | "glb" | "hdr";
export type HDRLoaderType = "hdr";

export type ModelAssetDescriptor =
  | {
      name: string;
      path: string;
      loaderType: ModelLoaderType;
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    }
  | {
      name: string;
      path: string;
      loaderType: HDRLoaderType;
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    };

export interface LoaderPlugin {
  load: () => Promise<void>;
  dispose?: () => void;
}

export const loaderPlugins: LoaderPlugin[] = [];

export type AssetType = "Mesh" | "HDR_Texture" | "Texture";

export interface ModelAssetRegistry {
  modelDescriptors: ModelAssetDescriptor[];
  environmentMap?: ModelAssetDescriptor;
}
