import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { AnimationOrchestrator } from "engine/managers/animation/AnimationManager";
import { InputManager } from "engine/managers/InputManager";
import { GlobalStorageManager } from "engine/managers/storage/storageTypes";
import {
  PlayerMovementController,
  createPlayerMovementController,
} from "gameplay/player/playerMovementController";
import { KeyboardInput } from "plugins/input/keyboard";
import { MouseInput } from "plugins/input/mouse";
import { Euler, Object3D, Vector3 } from "three";
import { Nullable } from "types/generic.types";
import { GenericLifeCycle, ModelIdentifier } from "types/rooms.types";
import { ServiceRegistry } from "types/service.types";
import { createPlayerAnimationEntity } from "./playerAnimationEntity";

/* -------------------------------------------------------------------------- */
/*                                Public Types                                */
/* -------------------------------------------------------------------------- */

export interface PlayerProps {
  reference: ModelIdentifier;
  storage: GlobalStorageManager;
  InputManager: InputManager;
}

export interface Player extends GenericLifeCycle {
  update: (deltaTime: number) => {
    position: Vector3;
    rotation: Euler;
    rotationDelta: { yaw: number; pitch: number };
  };
}

/* -------------------------------------------------------------------------- */
/*                               Internal Types                                */
/* -------------------------------------------------------------------------- */

interface Controllers {
  input: {
    mouse: Nullable<MouseInput>;
    keyboard: Nullable<KeyboardInput>;
  };
}

interface ObjectReferences {
  player: Nullable<Object3D>;
}

/**
 * @description creates a Player Entity who is controlled by input from keyborad and mouse and has animations
 * @param param0
 * @returns
 */
export const createPlayer = ({
  reference,
  storage,
  InputManager,
}: PlayerProps): Player => {
  /**
   * External Services
   */
  let controllers: Controllers;
  let movementController: PlayerMovementController;
  const registry: ServiceRegistry = getServiceRegistry();

  /**
   * Internal State
   */
  const objects: ObjectReferences = { player: null };
  let animationOrchestrator: AnimationOrchestrator;

  const animationEntityId = `player-${reference.storageId}`;
  let animationParams: ReturnType<typeof createPlayerAnimationEntity>["params"];
  let lastRotationDelta = { yaw: 0, pitch: 0 };

  /**
   * @description Hook called during initalization
   *
   */
  const mount = () => {
    const playerRoot = storage
      .getStorage("model")
      .retrieve(reference.storageId);

    if (!playerRoot) {
      throw new Error(`Player model not found for id ${reference.storageId}`);
    }

    objects.player = playerRoot.groups;
    const player = playerRoot.groups;

    /** Animation */

    animationOrchestrator = registry.get("AnimationManager");

    const animationEntity = createPlayerAnimationEntity({
      id: animationEntityId,
      playerObject: player,
      animations: playerRoot.animations,
    });

    animationEntity.playback.onMount();
    animationEntity.playback.play("Idle");

    animationParams = animationEntity.params;
    animationOrchestrator.addEntity(animationEntity);

    /** Input and Movement */

    controllers = {
      input: {
        mouse: InputManager.getController("mouse"),
        keyboard: InputManager.getController("keyboard"),
      },
    };

    movementController = createPlayerMovementController({
      object: objects.player,
      keyboard: controllers.input.keyboard,
      mouse: controllers.input.mouse,
    });

    movementController.initialize(new Vector3(0, 0, -1));
  };

  /**
   * @description Lifecycle Hook to update player entity
   * @param deltaTime teh time elapsed
   * @returns
   */
  const update = (deltaTime: number) => {
    if (!movementController || !objects.player) {
      return {
        position: new Vector3(),
        rotation: new Euler(),
        rotationDelta: { yaw: 0, pitch: 0 },
      };
    }

    const frame = movementController.update(deltaTime);

    animationParams.set("speed", frame.speed);
    animationParams.set("isMoving", frame.isMoving);
    animationParams.set("isRunning", frame.isRunning);

    lastRotationDelta.yaw = frame.yawDelta;

    return {
      position: objects.player.position,
      rotation: objects.player.rotation,
      rotationDelta: lastRotationDelta,
    };
  };

  /**
   * @description Called when we enter a particular state / room
   * @returns
   */
  const activate = () => {
    if (!objects.player) return;

    objects.player.position.set(0, 0, 0);
    objects.player.rotation.set(0, 0, 0);
  };

  /**
   * @description Called when we exit a particualr state / room
   */
  const deactivate = () => {};

  /**
   * @description Lifecycle Hook called when we un registers the entity
   */
  const unmount = () => {
    animationOrchestrator?.removeEntity(animationEntityId);
  };

  /* ------------------------------------------------------------------------ */

  return {
    mount,
    activate,
    deactivate,
    update,
    unmount,
  };
};
