import {
  createHDRLoader
} from "./chunk-AXJVKY2W.js";
import {
  createMeshLoader
} from "./chunk-LBGUDF2D.js";

// src/graphics/loader/loader.ts
import { LoadingManager } from "three";
var createLoader = (options, context) => {
  const { scene, renderer, loaderEventBus, globalState } = context;
  const { meshesMetaData, hdrMetaData } = options;
  const manager = new LoadingManager();
  const plugins = [];
  const _configureLoadingManager = () => {
    manager.onStart = (url, itemsLoaded, itemsTotal) => {
      loaderEventBus.emit({
        type: "load:start",
        url,
        loaded: itemsLoaded,
        total: itemsTotal
      });
      globalState.setState({
        loading: {
          active: true,
          progress: 0
        }
      });
    };
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      loaderEventBus.emit({
        type: "load:progress",
        url,
        loaded: itemsLoaded,
        total: itemsTotal
      });
      globalState.setState({
        loading: {
          active: true,
          progress: itemsLoaded / itemsTotal
        }
      });
    };
    manager.onLoad = () => {
      loaderEventBus.emit({
        type: "load:complete"
      });
    };
    manager.onError = (url) => {
      loaderEventBus.emit({
        type: "load:error",
        url
      });
    };
  };
  const _configurePlugins = () => {
    if (meshesMetaData.length > 0) {
      plugins.push(
        createMeshLoader({
          assets: meshesMetaData,
          scene,
          loadingManager: manager,
          loadingEventBus: loaderEventBus
        })
      );
    }
    if (hdrMetaData !== void 0 && hdrMetaData !== null) {
      plugins.push(
        createHDRLoader({
          asset: hdrMetaData,
          scene,
          renderer,
          loadingManager: manager,
          loadingEventBus: loaderEventBus
        })
      );
    }
  };
  const _configure = () => {
    _configureLoadingManager();
    _configurePlugins();
  };
  const load = async () => {
    const promises = [];
    plugins.forEach((plugin) => {
      promises.push(plugin.load());
    });
    Promise.allSettled(promises);
    return {
      success: [],
      error: []
    };
  };
  const dispose = () => {
    plugins.forEach((plugin) => {
      plugin.dispose?.();
    });
  };
  return {
    configure: _configure,
    loadAll: load,
    dispose
  };
};

export {
  createLoader
};
//# sourceMappingURL=chunk-ESBHI3E2.js.map