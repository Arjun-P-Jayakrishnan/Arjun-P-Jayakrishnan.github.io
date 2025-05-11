import {
  AxesHelper,
  Camera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  controls: OrbitControls;

  /**
   * @description Mount
   */
  register: (loop: () => void) => void;
  /**
   * @description Loop
   */
  render: () => void;
  /**
   * @description UnMount
   */
  dispose: (disposeCallbacks: Array<() => void>) => void;
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

  let scene: Scene = new Scene();

  let camera: PerspectiveCamera = new PerspectiveCamera(
    props.camera.fov,
    props.camera.aspect,
    props.camera.near,
    props.camera.far
  );

  let renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });

  let controls: OrbitControls = new OrbitControls(camera, renderer.domElement);

  let animationLoop: () => void;

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

  /**
   * @description handle resize of the canvas
   */
  const _handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };

  /**
   * @description event listener to monitor for window size changes
   */
  const _addEvents = () => {
    window.addEventListener("resize", _handleResize);
  };

  const addAxesHelper = () => {
    const axes_helper = new AxesHelper();
    scene.add(axes_helper);
  };

  /**
   * @description Life cycle method similar to Mount
   * @param loop callback for all rendering
   */
  const register = (loop: () => void) => {
    animationLoop = loop;

    _mountRenderer(props.domMountTag);
    _configureControls();
    _addEvents();

    camera.position.set(0, 0, 0.5);

    addAxesHelper();
    _handleResize();
  };

  /**
   * @description Life cycle method similar to update
   */
  const render = () => {
    //Recursive callback function
    requestAnimationFrame(render);

    controls.update();

    animationLoop();

    //Render scene from cameras perspective
    renderer.render(scene, camera);
  };

  /**
   * @description Life cycle method similar to UnMount
   * @param disposeCallbacks array of dispose callbacks to be executed
   */
  const dispose = (disposeCallbacks: Array<() => void>) => {
    disposeCallbacks.forEach((fn) => fn());

    window.removeEventListener("window", _addEvents);

    renderer.dispose();
    controls.dispose();
  };

  return Object.freeze({
    scene: scene,
    camera: camera,
    controls: controls,
    renderer: renderer,

    register: register,
    render: render,
    dispose: dispose,
  });
};
