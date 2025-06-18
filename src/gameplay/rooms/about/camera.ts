import { PerspectiveCamera, Scene, Vector3 } from "three";

export interface CameraProps {
  camera: PerspectiveCamera;
  scene: Scene;
}

export interface CameraManager {
  mount: () => void;
  activate: () => void;
  deactivate: () => void;
  unmount: () => void;
}

export const createCameraManager = (props: CameraProps): CameraManager => {
  const { camera, scene } = props;
  const target = new Vector3(0, 1, 2);
  const mount = () => {};

  const activate = () => {
    camera.position.set(target.x, 1, target.z);
    camera.rotation.set(0, 0, 0, "XYZ");

    console.log("activate camera position", camera.position);
  };

  const deactivate = () => {};

  const unmount = () => {};

  return {
    mount: mount,
    activate: activate,
    deactivate: deactivate,
    unmount: unmount,
  };
};
