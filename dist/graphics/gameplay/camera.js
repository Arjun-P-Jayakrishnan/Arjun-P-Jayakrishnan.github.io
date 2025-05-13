// src/graphics/gameplay/camera.ts
import { Vector3 } from "three";
var CAMERA_CONSTANTS = {
  THIRD_PERSON: {
    OFFSET: new Vector3(0, 5, -10)
  },
  FIRST_PERSON: {
    OFFSET: new Vector3(0, 0, 0)
  }
};
var tempData = {
  position: new Vector3(0, 0, 0)
};
var createCameraControls = (props) => {
  const { camera } = props;
  let isThirdPerson = true;
  const update = (playerPosition) => {
    if (isThirdPerson) {
      tempData.position.copy(playerPosition);
      tempData.position.add(CAMERA_CONSTANTS.THIRD_PERSON.OFFSET);
      camera.position.lerp(tempData.position, 0.1);
      camera.lookAt(playerPosition);
    } else {
    }
  };
  return {
    update
  };
};
export {
  createCameraControls
};
//# sourceMappingURL=camera.js.map