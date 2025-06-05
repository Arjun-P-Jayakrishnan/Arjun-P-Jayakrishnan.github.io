
import { getGlobalContext } from "managers/globalContext";
import { AnimationMixer, Scene } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import type { LoadingManager } from "three/src/loaders/LoadingManager.js";
import type { AssetMetaData, LoaderPlugin } from "../loaderPlugins";
import { createEventBus } from "@managers/events/eventBus";
import { LoadingEvents } from "@managers/events/eventType";

export interface FBXLoaderProps {
  assets: AssetMetaData[];
  scene: Scene;
  loadingManager: LoadingManager;
  loadingEventBus: ReturnType<typeof createEventBus<LoadingEvents>>;
}

export const createFBXLoader = (props: FBXLoaderProps): LoaderPlugin => {
  const { assets, scene, loadingManager, loadingEventBus } = props;
  const { globalStorage } = getGlobalContext();

  const fbxLoader: FBXLoader = new FBXLoader(loadingManager);
  

  /**
   * @description load the mesh
   * @param metaData meta-data for loading the mesh
   */
  const _loadMesh = async (metaData: AssetMetaData) => {
    try {
      const model = await fbxLoader.loadAsync(metaData.path);

      
      
      metaData.onSuccess?.();

      globalStorage.getStorage(metaData.name).store(
        metaData.name, 
        {
            animations: model.animations,
            groups:model,
            type: "",
        }
      );
     

      scene.add(model);

    } catch (err) {
      metaData.onError?.(err as Error);
      loadingEventBus.emit({ type: "load:error", url: metaData.path });
      console.error(err);
      throw err;
    }
  };

  const load = async () => {
    const promises: Promise<void>[] = [];
    assets.forEach((asset) => {
      promises.push(_loadMesh(asset));
    });

    await Promise.allSettled(promises);
  };

  const dispose = () => {};

  return {
    load: load,
    dispose: dispose,
  };
};
