import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface ThreeJsContext {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  orbit: OrbitControls;
}

let context: ThreeJsContext | null = null;

export interface ThreeJsContextManager {
  mount: (context: ThreeJsContext) => void;
  unmount: () => void;
  getProperty: <K extends keyof ThreeJsContext>(key: K) => ThreeJsContext[K];
}

export const getThreeJsContext = (): ThreeJsContextManager => {
  const mount = (_context: ThreeJsContext) => {
    if (!context) {
      context = _context;
    }
  };

  const unmount = () => {
    context = null;
  };

  const getProperty = <K extends keyof ThreeJsContext>(key: K) => {
    if (!context) {
      throw new Error(`Mount the three js context before accessing it`);
    }

    return context[key];
  };

  return {
    mount: mount,
    unmount: unmount,
    getProperty: getProperty,
  };
};
