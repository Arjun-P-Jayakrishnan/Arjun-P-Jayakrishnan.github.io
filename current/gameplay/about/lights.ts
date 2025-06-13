import {
  getThreeJsContext,
  ThreeJsContextManager,
} from "core/game_engine/game_context";
import { AmbientLight, DirectionalLight, PCFShadowMap } from "three";
import { Nullable } from "../../../current/utils/types/lifecycle";

export interface Lighting {
  mount: () => void;
  activate: () => void;
  deactivate: () => void;
  unmount: () => void;
}

export const createLighting = (): Lighting => {
  const ctx: ThreeJsContextManager = getThreeJsContext();
  const { scene, renderer } = {
    scene: ctx.get("scene"),
    renderer: ctx.get("renderer"),
  };

  let dirLight: Nullable<DirectionalLight>;
  let ambientLight: Nullable<AmbientLight>;

  const mount = () => {
    dirLight = new DirectionalLight(0xffffff, 5);
    dirLight.castShadow = true;
    dirLight.position.set(0, 2, 0);
    dirLight.target.position.set(0, 1, 0);

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;

    ambientLight = new AmbientLight(0xffffff);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
  };

  const activate = () => {
    if (dirLight) scene.add(dirLight);
    if (ambientLight) scene.add(ambientLight);
  };

  const deactivate = () => {
    if (dirLight) scene.remove(dirLight);
    if (ambientLight) scene.remove(ambientLight);
  };

  const unmount = () => {};

  return {
    mount: mount,
    activate: activate,
    deactivate: deactivate,
    unmount: unmount,
  };
};
