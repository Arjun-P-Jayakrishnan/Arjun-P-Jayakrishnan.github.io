import { Euler, MathUtils, PerspectiveCamera, Spherical, Vector3 } from "three";
import { GenericLifeCycle } from "types/rooms.types";

export type CameraMode = "firstPerson" | "thirdPerson";

export interface CameraProps {
  /**Main Camera */
  camera: PerspectiveCamera;
}

/** Contains the Updated info about player */
export type UpdatedInfo = {
  playerPosition: Vector3;
  rotationDelta: { yaw: number; pitch: number };
};

/** Controls to manage camera */
export interface CameraManager extends GenericLifeCycle {
  /** Updates the camera to look the player */
  update: (info: UpdatedInfo) => { rotation: Euler };

  /**sets the mode of camera */
  setMode: (mode: CameraMode) => void;
}

//Third Person Config
const TPV_CONFIG = {
  DISTANCE: 3,
  HEIGHT_OFFSET: 2,
  PITCH_MIN: 0,
  PITH_MAX: Math.PI / 2,
  SMOOTHING: 0.1,
} as const;

//Temporary Variables

let tempPosition = new Vector3(0, 0, 0);
let tempOffset = new Vector3(0, 0, 0);
let tempLookTarget = new Vector3(0, 0, 0);

/**
 *
 * @param yaw the yaw angle
 * @param pitch the pitch angle
 * @returns restricted angles
 */
function clampRotation(
  yaw: number,
  pitch: number
): { yaw: number; pitch: number } {
  return {
    yaw: MathUtils.euclideanModulo(yaw, Math.PI * 2),
    pitch: MathUtils.clamp(pitch, TPV_CONFIG.PITCH_MIN, TPV_CONFIG.PITH_MAX),
  };
}

/**
 *
 * @param spherical the spherical coordinates
 * @returns the Vector based on spherical coordinates
 */
function computeThirdPersonOffset(spherical: Spherical): Vector3 {
  tempOffset.set(0, 0, 0);
  tempOffset.setFromSpherical(spherical);
  tempOffset.y += TPV_CONFIG.HEIGHT_OFFSET;

  return tempOffset;
}

/**
 * Smoothly interpolate value between from and to vectors based on alpha
 */
function lerpVector(from: Vector3, to: Vector3, alpha: number) {
  return from.lerp(to, alpha);
}

interface InternalState {
  mode: CameraMode;
  rotation: { yaw: number; pitch: number };
  spherical: Spherical;
}

export const createCameraManager = ({ camera }: CameraProps): CameraManager => {
  let isThirdPerson: boolean = true;
  let state: InternalState = {
    mode: "thirdPerson",
    rotation: { pitch: Math.PI / 2, yaw: 0 },
    spherical: new Spherical(TPV_CONFIG.DISTANCE, Math.PI / 2, 0),
  };

  const setCamera = (mode: CameraMode) => {
    state.mode = mode;
  };

  const mount = () => {};

  const activate = () => {
    camera.position.set(1, 2, 3);
  };

  /**
   *
   * @param yaw
   * @param pitch
   */
  const updateRotation = (delta: { yaw: number; pitch: number }) => {
    state.rotation.yaw += delta.yaw;
    state.rotation.pitch += delta.pitch;

    const clamped = clampRotation(state.rotation.yaw, state.rotation.pitch);
    state.rotation.yaw = clamped.yaw;
    state.rotation.pitch = clamped.pitch;
  };

  const updateThirdPerson = (info: UpdatedInfo) => {
    state.spherical.theta = state.rotation.yaw;
    state.spherical.phi = state.rotation.pitch;

    //Calculate offset
    tempOffset.copy(computeThirdPersonOffset(state.spherical));

    //Calculate target position and camera lerp smoothly
    tempPosition.copy(info.playerPosition).add(tempOffset);
    camera.position.copy(
      lerpVector(camera.position, tempPosition, TPV_CONFIG.SMOOTHING)
    );

    tempLookTarget.copy(info.playerPosition);
    tempLookTarget.y += TPV_CONFIG.HEIGHT_OFFSET;
    camera.lookAt(tempLookTarget);
  };

  const updateFirstPerson = (playerPos: Vector3) => {
    camera.position.copy(playerPos);
    camera.rotation.set(state.rotation.pitch, state.rotation.yaw, 0);
  };

  const update = (info: UpdatedInfo): { rotation: Euler } => {
    updateRotation(info.rotationDelta);

    if (state.mode === "thirdPerson") {
      updateThirdPerson(info);
    } else {
      updateFirstPerson(info.playerPosition);
    }

    return {
      rotation: camera.rotation,
    };
  };

  const deactivate = () => {};

  const unmount = () => {};

  return {
    setMode: setCamera,
    update: update,
    mount: mount,
    activate: activate,
    deactivate: deactivate,
    unmount: unmount,
  };
};
