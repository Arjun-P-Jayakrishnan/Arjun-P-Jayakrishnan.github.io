import { KeyboardInput } from "plugins/input/keyboard";
import { MouseInput } from "plugins/input/mouse";
import { Object3D, Vector3 } from "three";
import { Nullable } from "types/generic.types";

export interface MovementFrame {
  speed: number;
  isMoving: boolean;
  isRunning: boolean;
  yawDelta: number;
  tilt: number; // current tilt applied
}

export interface PlayerMovementController {
  initialize: (forward: Vector3) => void;
  update: (deltaTime: number) => MovementFrame;
}

const MOVEMENT = {
  WALK_SPEED: 0.05,
  RUN_SPEED: 0.1,
  DEADZONE: 0.001,
  TILT_ANGLE: 0.25, // radians max tilt
  TILT_SPEED: 8.0, // how fast tilt interpolates
};

export const createPlayerMovementController = ({
  object,
  keyboard,
  mouse,
}: {
  object: Object3D;
  keyboard: Nullable<KeyboardInput>;
  mouse: Nullable<MouseInput>;
}): PlayerMovementController => {
  let yaw = 0;

  const BASE_FORWARD = new Vector3(0, 0, -1);
  const BASE_RIGHT = new Vector3(1, 0, 0);

  const forward = new Vector3();
  const right = new Vector3();
  const moveDir = new Vector3();

  let currentTilt = 0;

  const initialize = (initialForward: Vector3) => {
    const f = initialForward.clone().setY(0).normalize();
    forward.copy(f);
    right.crossVectors(object.up, forward).normalize();
    yaw = Math.atan2(forward.x, -forward.z);
    object.rotation.set(0, yaw, 0);
  };

  const updateMouse = (): number => {
    if (!mouse) return 0;
    const yawDelta = mouse.getRotation().yaw;
    yaw += yawDelta;

    object.rotation.set(0, yaw, 0);

    forward.copy(BASE_FORWARD).applyAxisAngle(new Vector3(0, 1, 0), yaw);
    right.copy(BASE_RIGHT).applyAxisAngle(new Vector3(0, 1, 0), yaw);

    return yawDelta;
  };

  const updateKeyboard = (
    deltaTime: number
  ): { speed: number; isRunning: boolean; tilt: number } => {
    moveDir.set(0, 0, 0);
    let lateral = 0;

    if (keyboard?.isKeyPressed("w")) moveDir.add(forward);
    if (keyboard?.isKeyPressed("s")) moveDir.sub(forward);
    if (keyboard?.isKeyPressed("d")) {
      moveDir.add(right);
      lateral = 1;
    }
    if (keyboard?.isKeyPressed("a")) {
      moveDir.sub(right);
      lateral = -1;
    }

    if (moveDir.lengthSq() > 0) moveDir.normalize();

    const isRunning = keyboard?.isKeyPressed("shift") ?? false;
    const speed =
      moveDir.lengthSq() > 0
        ? isRunning
          ? MOVEMENT.RUN_SPEED
          : MOVEMENT.WALK_SPEED
        : 0;

    // ----------------- Apply movement -----------------
    if (moveDir.lengthSq() > 0) {
      object.position.addScaledVector(moveDir, speed);
    }

    // ----------------- Apply tilt -----------------
    const targetTilt = lateral * MOVEMENT.TILT_ANGLE; // tilt toward left/right
    // smooth interpolation toward target (0 if no lateral input)
    currentTilt +=
      (targetTilt - currentTilt) * Math.min(deltaTime * MOVEMENT.TILT_SPEED, 1);
    object.rotation.x = currentTilt;

    return { speed, isRunning, tilt: currentTilt };
  };

  const update = (deltaTime: number): MovementFrame => {
    const yawDelta = updateMouse();
    const { speed, isRunning, tilt } = updateKeyboard(deltaTime);
    const isMoving = speed > MOVEMENT.DEADZONE;

    return {
      speed,
      isMoving,
      isRunning: isRunning && isMoving,
      yawDelta,
      tilt,
    };
  };

  return { initialize, update };
};
