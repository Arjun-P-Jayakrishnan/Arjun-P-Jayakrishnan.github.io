
import { getThreeJsContext } from "core/game_engine/game_context";
import { AboutRoom, } from "../configs";
import { CameraControls, createCameraControls } from "./camera";
import { Room } from "gameplay/controller/room_types";

export interface AboutRoomProps {}

interface Components {
  camera: CameraControls;
}

export const createAboutRoom = (props: AboutRoomProps): Room => {
  const { scene, camera } = {
    scene: getThreeJsContext().get("scene"),
    camera: getThreeJsContext().get("camera"),
  };
  const components: Components = {
    camera: createCameraControls({
      camera: camera,
      scene: scene,
    }),
  };

  const mount = () => {
    camera.position.set(0, 5, 10);
  };

  const activate = () => {};

  const update = (deltaTime: number) => {
    // components.camera.update(deltaTime);
  };

  const deactivate = () => {};

  const unmount = () => {};

  return {
    mount: mount,
    setActive: activate,
    update: update,
    setDeactive: deactivate,
    unmount: unmount,
    isLoaded:false
  };
};
