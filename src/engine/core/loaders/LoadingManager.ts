import { EventBus } from "@events/eventBus";
import { LoadingEvents } from "@events/eventType";
import { GlobalStorageManager } from "engine/managers/storage/storageTypes";
import { LoadingManager, Scene, WebGLRenderer } from "three";
import { LoadOptions, ModelAssetDescriptor } from "types/loader.types";
import { GlobalStateManager, LoadingContext } from "../state/stateType";
import { createFBXLoader } from "./fbx_loader";
import { createGLBLoader } from "./glb_loader";
import { createHDRLoader } from "./hdr_loader";

export interface LoaderProps {
  scene: Scene;
  renderer: WebGLRenderer;
  loaderEventBus: EventBus<LoadingEvents>;
  stateManager: GlobalStateManager;
  storageManager: GlobalStorageManager;
}

export interface Loader {
  configure: () => void;
  load: (assets: LoadOptions) => Promise<{
    success: string[];
    error: string[];
  }>;
  dispose: () => void;
}
/**
 * @description creates a loader with the given settings
 * @param options options to change loader settings
 * @param context global context with references
 * @returns Loader
 */
export const createLoader = ({
  scene,
  renderer,
  loaderEventBus,
  stateManager,
  storageManager,
}: LoaderProps): Loader => {
  const manager: LoadingManager = new LoadingManager();
  let isConfigured: boolean = false;
  const [glbLoader, fbxLoader, hdrLoader] = [
    createGLBLoader({
      scene,
      loadingManager: manager,
      storageManager,
    }),
    createFBXLoader({
      scene,
      loadingManager: manager,
      storageManager,
    }),
    createHDRLoader({
      scene,
      loadingManager: manager,
      renderer,
      storageManager,
    }),
  ];
  const assetQueue: {
    glb: ModelAssetDescriptor[];
    fbx: ModelAssetDescriptor[];
    hdr: ModelAssetDescriptor[];
  } = {
    glb: [],
    fbx: [],
    hdr: [],
  };

  /**
   * @description attaches the event bus for listening to loading changes
   */
  const _configureLoadingManager = () => {
    manager.onStart = (url, itemsLoaded, itemsTotal) => {
      loaderEventBus.emit({
        type: "load:start",
        url: url,
        loaded: itemsLoaded,
        total: itemsTotal,
      });
      stateManager.loading.setState({
        loading: { active: true, progress: 0 } as LoadingContext,
      });
    };

    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      loaderEventBus.emit({
        type: "load:progress",
        url: url,
        loaded: itemsLoaded,
        total: itemsTotal,
      });
      stateManager.loading.setState({
        loading: {
          active: true,
          progress: itemsLoaded / itemsTotal,
        } as LoadingContext,
      });
    };

    manager.onLoad = () => {
      loaderEventBus.emit({
        type: "load:complete",
      });
    };

    manager.onError = (url) => {
      loaderEventBus.emit({
        type: "load:error",
        url: url,
      });
    };

    isConfigured = true;
  };

  const pushToRespectiveLoaderQueue = (model: ModelAssetDescriptor) => {
    switch (model.type) {
      case "glb":
        assetQueue.glb.push(model);
        break;
      case "fbx":
        assetQueue.fbx.push(model);
        break;
      case "hdr":
        assetQueue.hdr.push(model);
        break;
      default:
        break;
    }
  };

  /**
   * @description create necessary loaders
   */
  const _configurePlugins = (assets: ModelAssetDescriptor[]) => {
    assets.forEach((asset) => {
      pushToRespectiveLoaderQueue(asset);
    });
  };

  /**
   * @description configuration
   */
  const _configure = () => {
    _configureLoadingManager();
  };

  /**
   * @description load all types of assets
   */
  const load = async (
    assets: LoadOptions
  ): Promise<{ success: []; error: [] }> => {
    if (!isConfigured)
      throw new Error(
        `Error: Trying to load from loader before configuring it`
      );

    const promises: Promise<void>[] = [];
    _configurePlugins(assets);

    promises.push(glbLoader.load(assetQueue.glb));
    promises.push(fbxLoader.load(assetQueue.fbx));
    promises.push(hdrLoader.load(assetQueue.hdr));

    await Promise.allSettled(promises);

    return {
      success: [],
      error: [],
    };
  };

  const dispose = () => {};

  return {
    configure: _configure,
    load: load,
    dispose: dispose,
  };
};
