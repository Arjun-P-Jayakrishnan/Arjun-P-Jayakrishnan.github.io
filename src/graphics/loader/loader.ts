import { createEventBus } from "@utils/event_management/eventBus";
import { LoadingEvents } from "@utils/event_management/eventType";
import { GlobalState } from "@utils/state/globalState";
import { LoadingContext } from "@utils/state/globalStateData";
import { LoadingManager, Scene, WebGLRenderer } from "three";
import { createHDRLoader } from "./file_type_plugins/hdr_loader";
import { createMeshLoader } from "./file_type_plugins/mesh_loader";
import { AssetMetaData, LoaderPlugin } from "./loaderPlugins";

export interface LoaderOptions {
  meshesMetaData: AssetMetaData[];
  hdrMetaData?: AssetMetaData;
}

export interface LoaderContext {
  scene: Scene;
  renderer: WebGLRenderer;
  loaderEventBus: ReturnType<typeof createEventBus<LoadingEvents>>;
  globalState: GlobalState;
}

export interface Loader {
  configure: () => void;
  loadAll: () => Promise<{
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
export const createLoader = (
  options: LoaderOptions,
  context: LoaderContext
): Loader => {
  const { scene, renderer, loaderEventBus, globalState } = context;
  const { meshesMetaData, hdrMetaData } = options;

  const manager: LoadingManager = new LoadingManager();
  const plugins: LoaderPlugin[] = [];

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
      globalState.setState({
        loading: {
          active: true,
          progress: 0,
        } as LoadingContext,
      });
    };

    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      loaderEventBus.emit({
        type: "load:progress",
        url: url,
        loaded: itemsLoaded,
        total: itemsTotal,
      });
      globalState.setState({
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
  };

  /**
   * @description create necessary loaders
   */
  const _configurePlugins = () => {
    if (meshesMetaData.length > 0) {
      plugins.push(
        createMeshLoader({
          assets: meshesMetaData,
          scene: scene,
          loadingManager: manager,
          loadingEventBus: loaderEventBus,
        })
      );
    }

    if (hdrMetaData !== undefined && hdrMetaData !== null) {
      plugins.push(
        createHDRLoader({
          asset: hdrMetaData,
          scene: scene,
          renderer: renderer,
          loadingManager: manager,
          loadingEventBus: loaderEventBus,
        })
      );
    }
  };

  /**
   * @description configuration
   */
  const _configure = () => {
    _configureLoadingManager();
    _configurePlugins();
  };

  /**
   * @description load all types of assets
   */
  const load = async (): Promise<{ success: []; error: [] }> => {
    const promises: Promise<void>[] = [];

    plugins.forEach((plugin) => {
      promises.push(plugin.load());
    });

    Promise.allSettled(promises);

    return {
      success: [],
      error: [],
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
    dispose: dispose,
  };
};
