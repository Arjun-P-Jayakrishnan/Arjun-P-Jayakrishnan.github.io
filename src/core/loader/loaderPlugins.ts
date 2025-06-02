//--Types-------------------------------------------------------------
export type AssetType = "Mesh" | "HDR_Texture" | "Texture";

export interface AssetMetaData {
  name:string;
  path: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface LoaderPlugin {
  load: () => Promise<void>;
  dispose?: () => void;
}

export const loaderPlugins: LoaderPlugin[] = [];
