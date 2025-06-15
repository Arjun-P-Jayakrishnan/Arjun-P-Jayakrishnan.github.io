import { getGlobalContext } from "@managers/globalContext";
import { getThreeJsContext } from "core/game_engine/game_context";
import { processPipelineDebugger } from "debug/debugger";
import {
  AnimationMixer,
  Object3D,
  Object3DEventMap,
  Scene,
  Vector3,
} from "three";
import { MouseController } from "../../../current/graphics/mechanics/controllers/plugins/mouse";
import { Nullable } from "../../../current/utils/types/lifecycle";

export interface PlayerProps {
  storageId: string;
  rootMeshId: string;
}

export interface PlayerContext {
  scene: Scene;
}

export interface Player {
  mount: () => void;
  activate: () => void;
  update: (deltaTime: number) => void;
  deactiavte: () => void;
  unmount: () => void;
}

interface PlayerState {}

interface ObjectReferences {
  playerRoot: Object3D;
}

interface Animation {
  mixer: AnimationMixer | null;
}

const PLAYER_CONSTANTS = {
  MOVEMENT_ACCELERATION: 0.05,
  MAX_VELOCITY: 0.05,
};

interface TempData {
  inputDirection: Vector3;
}

export const createPlayer = (props: PlayerProps): Player => {
  const { eventBusManager, globalState, globalStorage } = getGlobalContext();
  const contextManager = getThreeJsContext();

  let state: PlayerState = {};
  let tempData: TempData = { inputDirection: new Vector3(0, 0, 0) };
  let inputs: Nullable<MouseController>;

  let objects: ObjectReferences;
  let animations: Animation;
  let mixers: AnimationMixer[] = [];

  const castShadow = (player: Object3D<Object3DEventMap>) => {
    player.traverse((child) => {
      child.castShadow = true;
    });
  };

  const mount = () => {
    try {
      processPipelineDebugger.onMount("about-room-player");
      let playerRoot = globalStorage
        .getStorage("player")
        .retrieve("player")?.groups;
      let animations =
        globalStorage.getStorage("player").retrieve("player")?.animations ?? [];

      if (!playerRoot) {
        throw new Error(`player doesn't exist for the id ${props.rootMeshId}`);
      }
      console.log("player", playerRoot);
      console.log("animations loaded", animations);
      //Local References
      objects = {
        playerRoot: playerRoot,
      };

      // console.log('armature',armature)
      const mixer = new AnimationMixer(playerRoot);
      mixer.clipAction(animations[2]).play();

      mixers.push(mixer);
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  };

  const activate = () => {
    if (objects.playerRoot) {
      objects.playerRoot.rotation.set(0, 0, 0, "XYZ");
      objects.playerRoot.castShadow = true;
      castShadow(objects.playerRoot);
    }
  };

  const update = (deltaTime: number) => {
    mixers.forEach((mixer) => {
      mixer.update(deltaTime);
    });
  };

  const deactivate = () => {};

  const unmount = () => {};

  return {
    mount: mount,
    activate: activate,
    update: update,
    deactiavte: deactivate,
    unmount: unmount,
  };
};
