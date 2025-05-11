// src/graphics/loader/file_type_plugins/mesh_loader.ts
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
var createMeshLoader = (props) => {
  const { assets, scene, loadingManager, loadingEventBus } = props;
  const gltfLoader = new GLTFLoader(loadingManager);
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/public/draco/");
  gltfLoader.setDRACOLoader(dracoLoader);
  const _loadMesh = async (metaData) => {
    try {
      const model = await gltfLoader.loadAsync(metaData.path);
      scene.add(model.scene);
      model.scene.position.set(0, 0, 0);
      metaData.onSuccess?.();
    } catch (err) {
      metaData.onError?.(err);
      loadingEventBus.emit({ type: "load:error", url: metaData.path });
      console.error(err);
      throw err;
    }
  };
  const load = async () => {
    const promises = [];
    assets.forEach((asset) => {
      promises.push(_loadMesh(asset));
    });
    await Promise.allSettled(promises);
  };
  const dispose = () => {
  };
  return {
    load,
    dispose
  };
};

export {
  createMeshLoader
};
//# sourceMappingURL=chunk-LBGUDF2D.js.map