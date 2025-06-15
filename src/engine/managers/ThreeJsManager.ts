import { queueSteps } from "@utils/dsl";
import { DEFAULT_CAMERA_OPTIONS } from "config/constants";
import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Lifecycle } from "types/lifecycle.types";

export interface ThreeJSRenderOptions {
  /** Dom element id where the render will be mounted */
  domMountId: string;
}

export interface ThreeJsRenderer
  extends Lifecycle<[], [loop: () => void], [], [], []> {}

export const createThreeJsInstance = (
  props: ThreeJSRenderOptions
): ThreeJsRenderer => {
  //Local references
  const { fov, aspectRatio, near, far } = DEFAULT_CAMERA_OPTIONS;

  //=====Core Elements======
  let scene: Scene = new Scene();
  let camera: PerspectiveCamera = new PerspectiveCamera(
    fov,
    aspectRatio,
    near,
    far
  );
  let renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
  let orbit: OrbitControls;

  // State
  let animationCallback: Nullable<() => void> = null;
  let animationFrameId: Nullable<number> = null;

  //External Context Hook
  const contextManager = getServiceRegistry().get("ThreeJSContextManager");
  const logger = getServiceRegistry().get("Logger");

  //Internal Methods
  const mountRendererToDom = (elementId: string): void => {
    const container = document.getElementById(elementId);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    if (container) {
      container.appendChild(renderer.domElement);
      orbit = new OrbitControls(camera, renderer.domElement);
    } else {
      console.warn(`Could not find element with selector tag : ${elementId}`);
    }
  };

  /**
   * Mount the context_manager to allow reference to scene and other props externally
   */
  const exposeToContext = (): void => {
    contextManager.set("scene", scene);
    contextManager.set("camera", camera);
    contextManager.set("orbit", orbit);
    contextManager.set("renderer", renderer);
  };

  const onLoad = () => {
    return queueSteps(
      [mountRendererToDom, props.domMountId],
      [exposeToContext],
      [logger.onLoad, { origin: "ThreeJs-Manager" }]
    );
  };

  const onMount = (callback: () => void) => {
    return queueSteps(
      [
        () => {
          animationCallback = callback;
        },
      ],
      [logger.onMount, { origin: "ThreeJs-Manager" }]
    );
  };

  const render = () => {
    if (animationFrameId !== null) return; //prevent multiple render loops

    const loop = () => {
      //Recursive callback function
      animationFrameId = requestAnimationFrame(loop);
      animationCallback?.();
      renderer.render(scene, camera);
    };

    loop();
  };

  const onUnmount = () => {
    const container = document.getElementById(props.domMountId);
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    }
    if (container && renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
    }

    renderer.dispose();
    logger.onUnmount({ origin: "ThreeJs-Manager" });
  };

  return {
    onLoad: onLoad,
    onMount: onMount,
    onUpdate: render,
    onUnmount: onUnmount,
    onDestroy: () => {},
  };
};
