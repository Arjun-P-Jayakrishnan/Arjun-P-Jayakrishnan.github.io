import { PerspectiveCamera, Vector3 } from "three";

export interface CameraProps {
  camera: PerspectiveCamera;
}

export interface CameraControls {
  update: (playerPosition: Vector3) => void;
}

const CAMERA_CONSTANTS = {
  THIRD_PERSON: {
    OFFSET: new Vector3(0, 5, -10),
  },
  FIRST_PERSON: {
    OFFSET: new Vector3(0, 0, 0),
  },
};

let tempData: {
  position: Vector3;
} = {
  position: new Vector3(0, 0, 0),
};

export const createCameraControls = (props: CameraProps): CameraControls => {
  const { camera } = props;
  let isThirdPerson: boolean = true;

  const update = (playerPosition: Vector3) => {
    if (isThirdPerson) {
      tempData.position.copy(playerPosition);
      tempData.position.add(CAMERA_CONSTANTS.THIRD_PERSON.OFFSET);

      camera.position.lerp(tempData.position, 0.1);
      camera.lookAt(playerPosition);
    } else {
      /**TODO: FPV */
    }
  };

  return {
    update: update,
  };
};
