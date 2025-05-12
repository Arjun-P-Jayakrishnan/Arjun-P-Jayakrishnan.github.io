import { createEventBus } from "@utils/event_management/eventBus";
import type { LoadingEvents } from "@utils/event_management/eventType";
import { Scene } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { LoadingManager } from "three/src/loaders/LoadingManager.js";
import type { AssetMetaData, LoaderPlugin } from "../loaderPlugins";

export interface MeshLoaderProps {
  assets: AssetMetaData[];
  scene: Scene;
  loadingManager: LoadingManager;
  loadingEventBus: ReturnType<typeof createEventBus<LoadingEvents>>;
}

export const createMeshLoader = (props: MeshLoaderProps): LoaderPlugin => {
  const { assets, scene, loadingManager, loadingEventBus } = props;

  const gltfLoader: GLTFLoader = new GLTFLoader(loadingManager);
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/public/draco/");
  gltfLoader.setDRACOLoader(dracoLoader);

  /**
   * @description load the mesh
   * @param metaData meta-data for loading the mesh
   */
  const _loadMesh = async (metaData: AssetMetaData) => {
    try {
      const model = await gltfLoader.loadAsync(metaData.path);
      model.scene

      scene.add(model.scene);
      model.scene.position.set(0, 0, 0);
      metaData.onSuccess?.();
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
