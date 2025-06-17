import { GlobalStorageManager } from "engine/managers/storage/storageTypes";
import {
  DataTexture,
  LoadingManager,
  PMREMGenerator,
  Scene,
  WebGLRenderer,
} from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { ModelAssetDescriptor } from "types/loader.types";
import { LoaderPlugin } from "types/plugin.types";

export interface HDRTextureLoaderProps {
  scene: Scene;
  renderer: WebGLRenderer;
  loadingManager: LoadingManager;
  storageManager: GlobalStorageManager;
}

/**
 * @description loads .hdr files and illuminates scene
 * @param props hdr loading properties
 * @returns HDR loader plugin
 */
export const createHDRLoader = ({
  loadingManager,
  renderer,
  scene,
}: HDRTextureLoaderProps): LoaderPlugin => {
  const pmremGenerator: PMREMGenerator = new PMREMGenerator(renderer);
  const rgbeLoader: RGBELoader = new RGBELoader(loadingManager);

  /**
   * @description loads a hdr file
   * @param metaData meta-data for loading hdr
   */
  const _loadHDRTexture = async (
    metaData: ModelAssetDescriptor
  ): Promise<void> => {
    return new Promise((reject, resolve) => {
      console.log("path", metaData.path);
      rgbeLoader.load(
        metaData.path,
        (data: DataTexture, texData: object) => {
          const envMap = pmremGenerator.fromEquirectangular(data).texture;
          data.dispose();
          scene.environment = envMap;
          resolve();
        },
        undefined,
        (err) => {
          reject();
        }
      );
    });
  };

  const load = async (assets: ModelAssetDescriptor[]) => {
    const promises: Promise<void>[] = [];

    assets.forEach(async (asset) => {
      promises.push(_loadHDRTexture(asset));
    });

    await Promise.allSettled(promises);
  };

  const dispose = () => {
    pmremGenerator.dispose();
  };

  return {
    load: load,
  };
};
