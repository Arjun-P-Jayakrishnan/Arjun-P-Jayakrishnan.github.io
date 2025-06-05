import { AssetMetaData } from "core/loader/loaderPlugins";

export interface Assets{
  meshesMetaData: AssetMetaData[];
  hdrMetaData?: AssetMetaData;
}



export const assetMetaData: {
  meshes: AssetMetaData[];
  hdr?: AssetMetaData;
} = {
  meshes: [],
};

export const ASSET_META_DATA: Assets = {

  meshesMetaData: assetMetaData.meshes,
  hdrMetaData: assetMetaData.hdr,
  
};

