import { AxesHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { getThreeJsContext } from "./context";

export interface ThreeJSRenderProps {
  /**
   * Properties for camera
   */
  camera: {
    fov?: number;
    aspect?: number;
    near?: number;
    far?: number;
  };
  /**
   * Tag to which renderer has to be attached
   */
  domMountTag: string;
}

export interface ThreeJsRenderReference {
  /**
   * @description Mount
   */
  mount: () => void;
  /**
   * @description
   * @param loop the callback for updating
   */
  register: (loop: () => void) => void;
  /**
   * @description Loop
   */
  render: () => void;
  /**
   * @description UnMount
   */
  dispose: () => void;
}

/**
 * @description Creates a threejs environment in which further additions can be made
 * @param props properties that define the setup of game engine
 * @returns Render Lifecycle methods
 */
export const createThreeJsInstance = (
  props: ThreeJSRenderProps
): ThreeJsRenderReference => {
  //Local references
  const { fov, aspectRatio, near, far } = {
    fov: 75,
    aspectRatio: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
  };

  let scene: Scene = new Scene();

  let camera: PerspectiveCamera = new PerspectiveCamera(
    props.camera.fov ?? fov,
    props.camera.aspect ?? aspectRatio,
    props.camera.near ?? near,
    props.camera.far ?? far
  );

  let renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });

  let controls: OrbitControls = new OrbitControls(camera, renderer.domElement);

  let animationLoop: () => void | undefined;
  let animationFrameId: number = 0;

  const contextManager = getThreeJsContext();

  /**
   * @description add the renderer so that it can display the 3d
   * @param tag the dom tag to which the renderer is to be attached
   */
  const _mountRenderer = (tag: string) => {
    const container = document.getElementById(tag);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    if (container) {
      container.appendChild(renderer.domElement);
    } else {
      console.warn(`Could not find element with selector tag : ${tag}`);
    }
  };

  /**
   * @description setup initial properties of orbital controls
   */
  const _configureControls = () => {
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
  };

  const addAxesHelper = () => {
    const axes_helper = new AxesHelper();
    scene.add(axes_helper);
  };

  const _mountThreeJsContext = () => {
    contextManager.mount({
      scene: scene,
      camera: camera,
      renderer: renderer,
      orbit: controls,
    });
  };

  const mount = () => {
    _mountRenderer(props.domMountTag);
    _configureControls();

    camera.position.set(0, 0, 0.5);
    // scene.add(camera);

    addAxesHelper();

    _mountThreeJsContext();
  };

  const register = (loop: () => void) => {
    animationLoop = loop;
  };

  const render = () => {
    //Recursive callback function
    animationFrameId = requestAnimationFrame(render);

    if (controls.enabled || controls.enableDamping) {
      controls.update();
    }

    if (animationLoop) {
      animationLoop();
    }

    //Render scene from cameras perspective
    renderer.render(scene, camera);
  };

  /**
   * @description Life cycle method similar to UnMount
   * @param disposeCallbacks array of dispose callbacks to be executed
   */
  const dispose = () => {
    const container = document.getElementById(props.domMountTag);
    if (container && renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
    }

    cancelAnimationFrame(animationFrameId);

    renderer.dispose();
    controls.dispose();

    animationFrameId = 0;
  };

  return Object.freeze({
    mount: mount,
    register: register,
    render: render,
    dispose: dispose,
  });
};
