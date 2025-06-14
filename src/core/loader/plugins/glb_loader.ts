import { getGlobalContext } from "managers/globalContext";
import { AnimationMixer, Scene } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { LoadingManager } from "three/src/loaders/LoadingManager.js";
import { createEventBus } from "@managers/events/eventBus";
import { LoadingEvents } from "@managers/events/eventType";
import { LoaderPlugin, ModelAssetDescriptor } from "@utils/types/loading";

export interface GLBLoaderProps {
  assets: ModelAssetDescriptor[];
  scene: Scene;
  loadingManager: LoadingManager;
  loadingEventBus: ReturnType<typeof createEventBus<LoadingEvents>>;
}

export const createGLBLoader = (props: GLBLoaderProps): LoaderPlugin => {
  const { assets, scene, loadingManager, loadingEventBus } = props;
  const { globalStorage } = getGlobalContext();

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

      metaData.onSuccess?.();

      globalStorage.getStorage(metaData.name).store(metaData.name, {
        animations: model.animations,
        groups: model.scene,
        type: "",
      });

      scene.add(model.scene);
      //model.scene.position.set(0, 0, 0);
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
