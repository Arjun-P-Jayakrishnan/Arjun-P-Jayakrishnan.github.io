import { PLAYER_ASSET } from "config/asset_manifest";
import { createPlayerFSMController } from "plugins/fsm/player/controller";
import { AnimationMixer } from "three";
import { AnimationMap, PlayerStateId } from "types/fsm.types";
import { InputManager } from "../InputManager";
import { GlobalStorageManager } from "../storage/storageTypes";
import { createAnimationUnit } from "./AnimationUnit";

export interface AnimationManager {
  mount: (
    playerId: keyof AnimationMap,
    storage: GlobalStorageManager,
    inputs: InputManager
  ) => void;
  update: (deltaTime: number) => void;
}

export const createAnimationManager = (): AnimationManager => {
  const map: AnimationMap = {
    Player: null,
  };

  const _mountPlayer = (
    storage: GlobalStorageManager,
    inputs: InputManager
  ) => {
    /**Retrive Data from strorage */

    const playerAnimations =
      storage.getStorage("model").retrieve(PLAYER_ASSET.id)?.animations ?? [];
    const player = storage
      .getStorage("model")
      .retrieve(PLAYER_ASSET.id)?.groups;

    /**If both object and animations are there complete */
    if (player && playerAnimations.length > 0) {
      const mixer = new AnimationMixer(player);

      const playerAnimationUnit = createAnimationUnit<PlayerStateId>({
        actions: {
          Idle: mixer.clipAction(playerAnimations[0]),
          Walk: mixer.clipAction(playerAnimations[3]),
          Run: mixer.clipAction(playerAnimations[1]),
        },
        crossfadeDuration: 0.03,
      });
      const playerFSM = createPlayerFSMController({
        inputs,
        animationUnit: playerAnimationUnit,
      });

      playerAnimationUnit.onMount(mixer);
      playerFSM.mount();

      map.Player = {
        animationUnit: playerAnimationUnit,
        fsm: playerFSM,
      };
    }
  };

  const mount = (
    id: keyof AnimationMap,
    storage: GlobalStorageManager,
    inputs: InputManager
  ) => {
    switch (id) {
      case "Player":
        _mountPlayer(storage, inputs);
        break;
      default:
        throw new Error(`Error : Cant create an animation unit for ${id}`);
    }
  };

  const update = (deltaTime: number) => {
    if (map.Player) {
      map.Player.animationUnit.update(deltaTime);
      map.Player.fsm.update(deltaTime * 0.1);
    }
  };

  return {
    mount,
    update,
  };
};
