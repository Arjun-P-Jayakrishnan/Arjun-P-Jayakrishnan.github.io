import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface ThreeJsContext {
  scene: Scene | undefined;
  renderer: WebGLRenderer | undefined;
  camera: PerspectiveCamera | undefined;
  orbit: OrbitControls | undefined;
}

export interface ThreeJsContextManager {
  /** Injects three js context */
  set: <K extends keyof ThreeJsContext>(
    key: K,
    context: ThreeJsContext[K]
  ) => void;

  /**Safely access a property from context */
  get: <K extends keyof ThreeJsContext>(
    key: K
  ) => ThreeJsContext[K] | undefined;

  /** reset context to allow re-initailization */
  clear: () => void;
}

/** Interface to react with three js shared context */
export const createThreeJsContextManager = (): ThreeJsContextManager => {
  let internalContext: ThreeJsContext = {
    camera: undefined,
    orbit: undefined,
    renderer: undefined,
    scene: undefined,
  };

  const get = <K extends keyof ThreeJsContext>(key: K): ThreeJsContext[K] => {
    if (!internalContext[key])
      throw new Error(`Error : Accessing context when its not initialized`);

    return internalContext[key];
  };

  const set = <K extends keyof ThreeJsContext>(
    key: K,
    context: ThreeJsContext[K]
  ): void => {
    if (internalContext[key] !== undefined)
      throw new Error(
        `Error : Trying to overwrite already initialized context`
      );

    internalContext[key] = context;
  };

  const clear = () => {
    internalContext = {
      camera: undefined,
      orbit: undefined,
      renderer: undefined,
      scene: undefined,
    };
  };

  return {
    get: get,
    set: set,
    clear: clear,
  };
};
