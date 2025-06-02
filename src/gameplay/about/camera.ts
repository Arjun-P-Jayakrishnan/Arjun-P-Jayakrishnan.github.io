import { CameraHelper, PerspectiveCamera, Scene, Vector3 } from "three";

export interface CameraProps {
  camera: PerspectiveCamera;
  scene: Scene;
}

export interface CameraControls {}

interface State {
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
};

let tempData: {
  position: Vector3;
  offset: Vector3;
  lookTarget: Vector3;
} = {
  position: new Vector3(0, 0, 0),
  offset: new Vector3(0, 0, 0),
  lookTarget: new Vector3(0, 0, 0),
};

export const createCameraControls = (props: CameraProps): CameraControls => {
  const { camera, scene } = props;

  let isThirdPerson: boolean = true;
  let state: State = {
    pitch: 0,
    yaw: 0,
  };

  const offset = tempData.offset;
  const targetPosition = tempData.position;
  const lookTarget = tempData.lookTarget;
  const radius: number = CAMERA_CONSTANTS.THIRD_PERSON.DISTANCE ?? 5;
  const helper = new CameraHelper(camera);
  scene.add(helper);

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

  return {};
};
