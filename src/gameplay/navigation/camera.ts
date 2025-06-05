import { Euler, PerspectiveCamera, Vector3 } from "three";

export interface CameraProps {
  /**Main Camera */
  camera: PerspectiveCamera;
}

export interface CameraManager {
  /** Update Camera to always look to the player */
  update: ( playerPosition: Vector3, rotation: { yaw: number; pitch: number }) => { rotation: Euler };

  mount:()=>void
  activate:()=>void
  deactivate:()=>void
  unmount:()=>void
}

interface InternalState {
  yaw: number;
  pitch: number;
}

const CAMERA_CONSTANTS = {
  THIRD_PERSON: {
    OFFSET: new Vector3(0, 5, -10),
    DISTANCE: 10,
    HEIGHT_OFFSET: 3,
    PITCH: {
      MIN: 0,
      MAX: Math.PI / 3,
    },
    SMOOTHING: 0.1,
  },
  FIRST_PERSON: {
    OFFSET: new Vector3(0, 0, 0),
  },
} as const;

let tempData: {
  position: Vector3;
  offset: Vector3;
  lookTarget: Vector3;
} = {
  position: new Vector3(0, 0, 0),
  offset: new Vector3(0, 0, 0),
  lookTarget: new Vector3(0, 0, 0),
};

export const createCameraManager = (props: CameraProps): CameraManager => {
  const { camera } = props;
  let isThirdPerson: boolean = true;
  let state: InternalState = { pitch: 0, yaw: 0,};

  const offset = tempData.offset;
  const targetPosition = tempData.position;
  const lookTarget = tempData.lookTarget;
  const radius: number = CAMERA_CONSTANTS.THIRD_PERSON.DISTANCE ?? 5;
  
  /**
   *
   * @param yaw
   * @param pitch
   */
  const applyRotationDelta = (yaw: number, pitch: number) => {
    state.yaw += yaw;
    state.pitch += pitch;

    state.pitch = Math.max(
      CAMERA_CONSTANTS.THIRD_PERSON.PITCH.MIN,
      Math.min(state.pitch, CAMERA_CONSTANTS.THIRD_PERSON.PITCH.MAX)
    );
  };

  const update = (
    playerPosition: Vector3,
    rotation: { yaw: number; pitch: number }
  ) => {
    if (isThirdPerson) {
      const { yaw, pitch } = rotation;

      applyRotationDelta(yaw, pitch);

      //Transform position of camera - Coordinates math
      offset.x = radius * Math.sin(state.yaw) * Math.cos(state.pitch);
      offset.y = radius * Math.sin(state.pitch) + CAMERA_CONSTANTS.THIRD_PERSON.HEIGHT_OFFSET;
      offset.z = radius * Math.cos(state.yaw) * Math.cos(state.pitch);

      //Apply target position and reach there
      targetPosition.copy(playerPosition).add(offset);
      camera.position.lerp( targetPosition , CAMERA_CONSTANTS.THIRD_PERSON.SMOOTHING);

      //Focus
      lookTarget.copy(playerPosition);
      lookTarget.y += CAMERA_CONSTANTS.THIRD_PERSON.HEIGHT_OFFSET;
      camera.lookAt(lookTarget);

      return {
        rotation: camera.rotation,
      };
    } else {
      /**TODO: FPV */

      return {
        rotation: new Euler(0, 0, 0, "XYZ"),
      };
    }
  };

  const mount=()=>{

  }

  const activate=()=>{
    camera.position.set(1,2,3);
  }

  const deactivate=()=>{}

  const unmount=()=>{}

  return {
    update: update,
    mount:mount,
    activate:activate,
    deactivate:deactivate,
    unmount:unmount
  };
};
