
import { getGlobalContext } from "@managers/globalContext";
import { getThreeJsContext } from "core/game_engine/game_context";
import { Nullable } from "core/lifecyle";
import { processPipelineDebugger } from "debug/debugger";
import { getControllers } from "graphics/mechanics/controllers/controller";
import { KeyboardController } from "graphics/mechanics/controllers/plugins/keyboard";
import { MouseController } from "graphics/mechanics/controllers/plugins/mouse";
import { AnimationMixer, Euler, Object3D, Object3DEventMap, Scene, Vector3 } from "three";


export interface PlayerProps {
  rootMeshId:string
}

export interface PlayerContext {
  scene: Scene;
}

export interface Player {
  mount: () => void;
  activate:()=>void;
  deactiavte:()=>void;
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
  let tempData: TempData = {inputDirection: new Vector3(0, 0, 0),};
  let inputs: Nullable<MouseController>;

  let objects: ObjectReferences;
  let animations: Animation;

  const castShadow=(player:Object3D<Object3DEventMap>)=>{
      player.traverse((child)=>{
        child.castShadow=true
      })
  }

  const mount=()=>{
     try {
      processPipelineDebugger.onMount('about-room-player')
      let playerRoot = contextManager
        .get("scene")
        .getObjectByName(props.rootMeshId);

      if (!playerRoot) {
        throw new Error(
          `player doesn't exist for the id ${props.rootMeshId}`
        );
      }

      
      //Local References
      objects = {
        playerRoot: playerRoot,
      };

      animations = {
        mixer: new AnimationMixer(playerRoot),
      };
    } catch (err) {
      console.error(`Player mesh cant be obtained :${err}`);
    }
  }

  const activate=()=>{
    if(objects.playerRoot) {
      objects.playerRoot.rotation.set(0,-Math.PI/3,0,'XYZ')
      objects.playerRoot.castShadow=true;
      castShadow(objects.playerRoot)
    }
  }

  const deactivate=()=>{}

  const unmount=()=>{

  }


  return {
    mount:mount,
    activate:activate,
    deactiavte:deactivate,
    unmount:unmount
  };
};
