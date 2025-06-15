import { GlobalStorageManager } from "engine/managers/storage/storageTypes";
import { LoadingManager, Scene } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ModelAssetDescriptor } from "types/loader.types";
import { LoaderPlugin } from "types/plugin.types";

export interface GLBLoaderProps {
  scene: Scene;
  loadingManager: LoadingManager;
  storageManager: GlobalStorageManager;
}

export const createGLBLoader = ({
  scene,
  loadingManager,
  storageManager,
}: GLBLoaderProps): LoaderPlugin => {
  const gltfLoader: GLTFLoader = new GLTFLoader(loadingManager);
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/public/draco/");
  gltfLoader.setDRACOLoader(dracoLoader);

  /**
   * @description load the mesh
   * @param metaData meta-data for loading the mesh
   */
  const _loadMesh = async (metaData: ModelAssetDescriptor) => {
    try {
      const model = await gltfLoader.loadAsync(metaData.path);
      storageManager.getStorage("model").store(metaData.id, {
        animations: model.animations,
        groups: model.scene,
      });
      scene.add(model.scene);
    } catch (err) {
      throw new Error(`Errr occuerd while loading a glb file : ${err}`);
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
