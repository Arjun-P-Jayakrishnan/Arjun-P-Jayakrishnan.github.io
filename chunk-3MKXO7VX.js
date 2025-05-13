// src/graphics/loader/file_type_plugins/hdr_loader.ts
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { PMREMGenerator } from "three";
var createHDRLoader = (props) => {
  const { asset, scene, renderer, loadingManager, loadingEventBus } = props;
  const pmremGenerator = new PMREMGenerator(renderer);
  const rgbeLoader = new RGBELoader(loadingManager);
  const _loadHDRTexture = async (metaData) => {
    return new Promise((reject, resolve) => {
      rgbeLoader.load(
        metaData.path,
        (data, texData) => {
          const envMap = pmremGenerator.fromEquirectangular(data).texture;
          data.dispose();
          scene.environment = envMap;
          metaData.onSuccess?.();
          resolve();
        },
        void 0,
        (err) => {
          metaData.onError?.(err);
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
    load,
    dispose
  };
};

export {
  createHDRLoader
};
//# sourceMappingURL=chunk-3MKXO7VX.js.map