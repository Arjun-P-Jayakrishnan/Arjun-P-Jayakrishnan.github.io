import { KeyboardInput } from "plugins/input/keyboard";
import { Object3D, Raycaster, Vector3 } from "three";
import { Nullable } from "types/generic.types";

/* -------------------------------------------------------------------------- */
/*                             Interaction Types                               */
/* -------------------------------------------------------------------------- */

export interface InteractiveObject {
  object: Object3D;
  radius: number; // proximity radius
  onInteract: () => void;
}

export interface PlayerInteractionController {
  /**
   * Call each frame to update interaction logic
   * @param deltaTime Time elapsed since last frame
   */
  update: (deltaTime: number) => void;

  /** Registers an interactive object */
  registerInteractiveObject: (obj: InteractiveObject) => void;

  /** Removes a specific interactive object */
  removeInteractiveObject: (obj: InteractiveObject) => void;

  /** Clears all interactive objects */
  clearInteractiveObjects: () => void;
}

/* -------------------------------------------------------------------------- */
/*                               Constants                                      */
/* -------------------------------------------------------------------------- */

const INTERACTION = {
  MAX_DISTANCE: 3.0, // max distance to detect objects
};

/* -------------------------------------------------------------------------- */
/*                       Factory: Interaction Controller                       */
/* -------------------------------------------------------------------------- */

export const createPlayerInteractionController = ({
  playerObject,
  keyboard,
  forwardVector,
}: {
  /** Root object of the player */
  playerObject: Object3D;

  /** Keyboard controller to detect interaction input */
  keyboard: Nullable<KeyboardInput>;

  /** Current forward direction of player (unit vector) */
  forwardVector: Vector3;
}): PlayerInteractionController => {
  const raycaster = new Raycaster();
  const interactiveObjects: InteractiveObject[] = [];

  const update = (_deltaTime: number) => {
    if (!playerObject) return;

    // 1️⃣ Filter objects by distance (proximity)
    const nearbyObjects = interactiveObjects.filter((obj) => {
      return (
        playerObject.position.distanceTo(obj.object.position) <= obj.radius
      );
    });

    if (nearbyObjects.length === 0) return;

    // 2️⃣ Raycast from player forward to detect what the player is looking at
    raycaster.set(playerObject.position, forwardVector.clone().normalize());

    const intersects = raycaster.intersectObjects(
      nearbyObjects.map((o) => o.object),
      true
    );

    if (intersects.length > 0) {
      const targetObj = nearbyObjects.find(
        (obj) => obj.object === intersects[0].object
      );

      if (targetObj) {
        // Highlight or show "Press E" prompt here
        console.log("Looking at interactive object:", targetObj.object.name);

        // Interaction input
        if (keyboard?.isKeyPressed("e")) {
          targetObj.onInteract();
        }
      }
    }
  };

  const registerInteractiveObject = (obj: InteractiveObject) => {
    if (!interactiveObjects.includes(obj)) {
      interactiveObjects.push(obj);
    }
  };

  const removeInteractiveObject = (obj: InteractiveObject) => {
    const index = interactiveObjects.indexOf(obj);
    if (index !== -1) {
      interactiveObjects.splice(index, 1);
    }
  };

  const clearInteractiveObjects = () => {
    interactiveObjects.length = 0;
  };

  return {
    update,
    registerInteractiveObject,
    removeInteractiveObject,
    clearInteractiveObjects,
  };
};
