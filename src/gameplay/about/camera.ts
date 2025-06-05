import { lifecycleDebugger } from "debug/lifecycle_debugger";
import {  PerspectiveCamera, Scene, Vector3 } from "three";

export interface CameraProps {
  camera: PerspectiveCamera;
  scene: Scene;
}

export interface CameraManager {
  mount:()=>void
  activate:()=>void;
  deactivate:()=>void;
  unmount:()=>void
}



export const createCameraManager = (props: CameraProps): CameraManager => {
  const { camera, scene } = props;
  const target=new Vector3(0,1,2);
  const mount=()=>{
  }

  const activate=()=>{
    lifecycleDebugger.activate('camera','about');
    
    camera.position.set(target.x, 1, target.z);
    camera.rotation.set(0,0,0,'XYZ')
  }

  const deactivate=()=>{
    lifecycleDebugger.deactivate('camera','about')
  }

  const unmount=()=>{
    lifecycleDebugger.unmount('camera','unmount')
  }

  return {
    mount:mount,
    activate:activate,
    deactivate:deactivate,
    unmount:unmount
  };
};
