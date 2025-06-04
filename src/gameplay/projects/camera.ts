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

  const mount=()=>{}

  const activate=()=>{
    camera.position.set(0, 1,5);
  }

  const deactivate=()=>{}

  const unmount=()=>{}

  return {
    mount:mount,
    activate:activate,
    deactivate:deactivate,
    unmount:unmount
  };
};
