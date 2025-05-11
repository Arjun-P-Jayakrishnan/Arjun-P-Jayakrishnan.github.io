// src/graphics/internal/internal.ts
import {
  AxesHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
var createThreeJsInstance = (props) => {
  let scene = new Scene();
  let camera = new PerspectiveCamera(
    props.camera.fov,
    props.camera.aspect,
    props.camera.near,
    props.camera.far
  );
  let renderer = new WebGLRenderer({ antialias: true });
  let controls = new OrbitControls(camera, renderer.domElement);
  let animationLoop;
  const _mountRenderer = (tag) => {
    const container = document.getElementById(tag);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (container) {
      container.appendChild(renderer.domElement);
    } else {
      console.warn(`Could not find element with selector tag : ${tag}`);
    }
  };
  const _configureControls = () => {
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
  };
  const _handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  const _addEvents = () => {
    window.addEventListener("resize", _handleResize);
  };
  const addAxesHelper = () => {
    const axes_helper = new AxesHelper();
    scene.add(axes_helper);
  };
  const register = (loop) => {
    animationLoop = loop;
    _mountRenderer(props.domMountTag);
    _configureControls();
    _addEvents();
    camera.position.set(0, 0, 0.5);
    scene.add(camera);
    addAxesHelper();
    _handleResize();
  };
  const render = () => {
    requestAnimationFrame(render);
    controls.update();
    animationLoop();
    renderer.render(scene, camera);
  };
  const dispose = (disposeCallbacks) => {
    disposeCallbacks.forEach((fn) => fn());
    window.removeEventListener("window", _addEvents);
    renderer.dispose();
    controls.dispose();
  };
  return Object.freeze({
    scene,
    camera,
    controls,
    renderer,
    register,
    render,
    dispose
  });
};

export {
  createThreeJsInstance
};
//# sourceMappingURL=chunk-NCT4VP26.js.map