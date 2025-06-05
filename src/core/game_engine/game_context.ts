import { Nullable } from "core/lifecyle";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface ThreeJsContext {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  orbit:OrbitControls
}

let internalContext:  Nullable<ThreeJsContext> = null;

export interface ThreeJsContextManager {
  /** Injects three js context */
  mount: (context: ThreeJsContext) => void;

  /** reset context to allow re-initailization */
  unmount: () => void;

  /**Safely access a property from context */
  get: <K extends keyof ThreeJsContext>(key: K) => ThreeJsContext[K];
}

/** Interface to react with three js shared context */
export const getThreeJsContext = (): ThreeJsContextManager => {
  const mount = (ctx: ThreeJsContext) => {
    if (internalContext) {
        throw new Error('[ThreeJsContext] Cannot mount again. Unmount first.');
    }
    
    internalContext = ctx;
  };

  const unmount = () => {
    internalContext = null;
  };

  const get = <K extends keyof ThreeJsContext>(key: K) => {
    if (!internalContext) {
      throw new Error(`Cannot access "${key}" before context is mounted`);
    }
    return internalContext[key];
  };

  return {
    mount: mount,
    unmount: unmount,
    get: get,
  };
};
