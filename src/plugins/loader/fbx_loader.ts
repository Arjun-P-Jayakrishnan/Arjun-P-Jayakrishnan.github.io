import { GlobalStorageManager } from "engine/managers/storage/storageTypes";
import { Scene } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import type { LoadingManager } from "three/src/loaders/LoadingManager.js";
import { ModelAssetDescriptor } from "types/loader.types";
import { LoaderPlugin } from "types/plugin.types";

export interface FBXLoaderProps {
  scene: Scene;
  loadingManager: LoadingManager;
  storageManager: GlobalStorageManager;
}

export const createFBXLoader = ({
  loadingManager,
  scene,
  storageManager,
}: FBXLoaderProps): LoaderPlugin => {
  const fbxLoader: FBXLoader = new FBXLoader(loadingManager);

  /**
   * @description load the mesh
   * @param metaData meta-data for loading the mesh
   */
  const _loadMesh = async (metaData: ModelAssetDescriptor) => {
    try {
      const model = await fbxLoader.loadAsync(metaData.path);
      storageManager.getStorage("model").store(metaData.id, {
        animations: model.animations,
        groups: model,
      });
      scene.add(model);
    } catch (err) {
      throw new Error(`Error while loading fbx file : ${err}`);
    }
  };

  const load = async (assets: ModelAssetDescriptor[]) => {
    const promises: Promise<void>[] = [];
    assets.forEach((asset) => {
      promises.push(_loadMesh(asset));
    });

    await Promise.allSettled(promises);
  };

  return {
    load: load,
  };
};
