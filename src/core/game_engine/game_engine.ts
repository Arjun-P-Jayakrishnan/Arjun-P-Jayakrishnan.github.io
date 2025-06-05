import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { getThreeJsContext } from "./game_context";
import { LifeCycle, Nullable } from "core/lifecyle";
import { processPipelineDebugger } from "debug/debugger";

export interface ThreeJSRenderOptions {
  /** Dom element id where the render will be mounted */
  domMountId: string;
}

export interface ThreeJsRenderer extends LifeCycle{
  /** Register a callback executed on each animation frame */
  register: (loop: () => void) => void;

  /** Start rendering loop */
  render: () => void;
}

const DEFAULT_CAMERA_OPTIONS={
   fov: 75 ,
   aspectRatio: window.innerWidth / window.innerHeight,
   near: 0.1,
   far: 1000,
} as const;



export const createThreeJsInstance = (
  props: ThreeJSRenderOptions
): ThreeJsRenderer => {
  //Local references
  const { fov,aspectRatio, near, far } = DEFAULT_CAMERA_OPTIONS;
  
  //=====Core Elements======
  let scene: Scene = new Scene();
  let camera: PerspectiveCamera = new PerspectiveCamera(fov,aspectRatio,near,far);
  let renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
  let orbit:OrbitControls;

  // State
  let animationCallback: Nullable<()=>void>=null;
  let animationFrameId: Nullable<number> = null;

  //External Context Hook
  const contextManager = getThreeJsContext();

  //Internal Methods

  const mountRendererToDom = (elementId: string):void => {
    const container = document.getElementById(elementId);
  

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    if (container) {
      container.appendChild(renderer.domElement);
      orbit= new OrbitControls(camera,renderer.domElement);
    } else {
      console.warn(`Could not find element with selector tag : ${elementId}`);
    }
  };
 
  /**
   * Mount the context_manager to allow reference to scene and other props externally
   */
  const exposeToContext = ():void => {
    contextManager.mount({scene: scene,camera: camera,renderer: renderer,orbit:orbit});
  };

  const mount = () => {
    mountRendererToDom(props.domMountId);
    exposeToContext();
    processPipelineDebugger.onMount('game-engine')
  };

  const register = (callback: () => void):void => {
    animationCallback = callback;
    processPipelineDebugger.onCallback('game-engine registration')
  };

  const render = () => {
    if(animationFrameId !==null) return;//prevent multiple render loops

    const loop=()=>{
      //Recursive callback function
      animationFrameId = requestAnimationFrame(loop);
      animationCallback?.();
      renderer.render(scene, camera);
    }
  
    loop();
  };

  
  const unmount = () => {
    const container = document.getElementById(props.domMountId);
    if(animationFrameId!==null){
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
    }
    if (container && renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
    }

    renderer.dispose();
    processPipelineDebugger.onUnmount('game-engine')
  };

  return {
    mount: mount,
    register: register,
    render: render,
    unmount: unmount,
  };
};
