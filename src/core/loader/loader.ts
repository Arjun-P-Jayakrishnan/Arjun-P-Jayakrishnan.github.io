import { LoadingManager, Scene, WebGLRenderer } from "three";
import { createHDRLoader } from "./file_type_plugins/hdr_loader";
import { createMeshLoader } from "./file_type_plugins/mesh_loader";
import { AssetMetaData, LoaderPlugin } from "./loaderPlugins";
import { LoadingEvents } from "@managers/events/eventType";
import { createEventBus } from "@managers/events/eventBus";
import { GlobalState } from "@managers/state/globalState";
import { LoadingContext } from "@managers/state/globalStateData";
import { processPipelineDebugger } from "debug/debugger";
import { createFBXLoader } from "./file_type_plugins/fbx_loader";

export interface LoadOptions {
  meshesMetaData: AssetMetaData[];
  hdrMetaData?: AssetMetaData;
  animationsMetaData:AssetMetaData[];
}

export interface LoaderContext {
  scene: Scene;
  renderer: WebGLRenderer;
  loaderEventBus: ReturnType<typeof createEventBus<LoadingEvents>>;
  globalState: GlobalState;
}

export interface Loader {
  configure: () => void;
  load: (assets:LoadOptions) => Promise<{
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
  context: LoaderContext
): Loader => {
  const { scene, renderer, loaderEventBus, globalState } = context;
  

  const manager: LoadingManager = new LoadingManager();
  let plugins: LoaderPlugin[] = [];

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
  const _configurePlugins = (meshes:AssetMetaData[],animations:AssetMetaData[],hdr?:AssetMetaData) => {
    if (meshes.length > 0) {
      plugins.push(
        createMeshLoader({
          assets: meshes,
          scene: scene,
          loadingManager: manager,
          loadingEventBus: loaderEventBus,
        })
      );
    }

    if (hdr !== undefined && hdr !== null) {
      plugins.push(
        createHDRLoader({
          asset: hdr,
          scene: scene,
          renderer: renderer,
          loadingManager: manager,
          loadingEventBus: loaderEventBus,
        })
      );
    }
    if(animations.length>0){
      plugins.push(
        createFBXLoader({
          assets:animations,
          scene:scene,
          loadingManager:manager,
          loadingEventBus:loaderEventBus,
        })
      )
    }
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
  const load = async (assets:LoadOptions): Promise<{ success: []; error: [] }> => {
    processPipelineDebugger.onInit(`loading the models ${JSON.stringify(assets)}`)

    const promises: Promise<void>[] = [];
     _configurePlugins(assets.meshesMetaData,assets.animationsMetaData,assets.hdrMetaData,);

    plugins.forEach((plugin) => {
      promises.push(plugin.load());
    });

    await Promise.allSettled(promises);

    plugins=[];

    processPipelineDebugger.onInit(`loaded models i guess`)

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
    load: load,
    dispose: dispose,
  };
};
