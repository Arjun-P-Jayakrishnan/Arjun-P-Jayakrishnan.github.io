
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import type { AssetMetaData, LoaderPlugin } from "../loaderPlugins";
import { DataTexture, LoadingManager, PMREMGenerator, Scene, WebGLRenderer } from "three";
import { createEventBus } from "@managers/events/eventBus";
import { LoadingEvents } from "@managers/events/eventType";

export interface HDRTextureLoaderProps {
  asset: AssetMetaData;
  scene: Scene;
  renderer: WebGLRenderer;
  loadingManager: LoadingManager;
  loadingEventBus: ReturnType<typeof createEventBus<LoadingEvents>>;
}

/**
 * @description loads .hdr files and illuminates scene
 * @param props hdr loading properties
 * @returns HDR loader plugin
 */
export const createHDRLoader = (props: HDRTextureLoaderProps): LoaderPlugin => {
  const { asset, scene, renderer, loadingManager, loadingEventBus } = props;

  const pmremGenerator: PMREMGenerator = new PMREMGenerator(renderer);
  const rgbeLoader: RGBELoader = new RGBELoader(loadingManager);

  /**
   * @description loads a hdr file
   * @param metaData meta-data for loading hdr
   */
  const _loadHDRTexture = async (metaData: AssetMetaData): Promise<void> => {
    return new Promise((reject, resolve) => {
      rgbeLoader.load(
        metaData.path,
        (data: DataTexture, texData: object) => {
          const envMap = pmremGenerator.fromEquirectangular(data).texture;
          data.dispose();
          scene.environment = envMap;
          metaData.onSuccess?.();
          resolve();
        },
        undefined,
        (err) => {
          metaData.onError?.(err as Error);
          loadingEventBus.emit({ type: "load:error", url: metaData.path });
          reject();
        }
      );
    });
  };

  const load = async () => {
    await _loadHDRTexture(asset);
  };

  const dispose = () => {
    pmremGenerator.dispose();
  };

  return {
    load: load,
    dispose: dispose,
  };
};
