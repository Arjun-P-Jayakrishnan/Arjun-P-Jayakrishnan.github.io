//--Types-------------------------------------------------------------
export type AssetType = "Mesh" | "HDR_Texture" | "Texture";

export interface AssetMetaData {
  path: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface LoaderPlugin {
  load: () => Promise<void>;
  dispose?: () => void;
}

export const loaderPlugins: LoaderPlugin[] = [];
