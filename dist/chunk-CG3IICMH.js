import {
  getGlobalContext
} from "./chunk-SST3M2JD.js";

// src/graphics/loader/file_type_plugins/mesh_loader.ts
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
var createMeshLoader = (props) => {
  const { assets, scene, loadingManager, loadingEventBus } = props;
  const { globalStorage } = getGlobalContext();
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
      globalStorage.getStorage("animations").store(metaData.name + ":animations", model.animations);
      globalStorage.getStorage("groups").store(metaData.name + ":groups", model.scene);
      console.log("loading mesh", metaData.name);
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
//# sourceMappingURL=chunk-CG3IICMH.js.map