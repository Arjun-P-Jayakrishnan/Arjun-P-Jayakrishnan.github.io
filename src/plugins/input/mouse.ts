import { MOUSE_CONFIG } from "config/constants";
import { InputPlugin } from "types/plugin.types";

interface MouseInput extends InputPlugin {
  /**Gets the delta Rotation */
  getRotation: () => { pitch: number; yaw: number };
}

interface State {
  mouse: {
    lastX: number;
    lastY: number;
  };

  rotation: {
    pitch: number;
    yaw: number;
  };
}

export const createMouseController = (): MouseInput => {
  const { sensitivityYaw, sensitivityPitch } = MOUSE_CONFIG.SENSITIVITY;

  let state: State = {
    mouse: {
      lastX: 0,
      lastY: 0,
    },
    rotation: {
      pitch: 0,
      yaw: 0,
    },
  };

  const handleMouse = (e: MouseEvent) => {
    state.rotation.pitch += e.movementY;
    state.rotation.yaw += e.movementX;
  };

  const mountEvents = () => {
    document.addEventListener("mousemove", handleMouse);
  };

  const unmountEvents = () => {
    document.removeEventListener("mousemove", handleMouse);
  };

  const getRotation = () => {
    const sideways = state.rotation.yaw;
    const up_down = state.rotation.pitch;

    state.rotation.pitch = 0;
    state.rotation.yaw = 0;

    return {
      yaw: -sensitivityYaw * sideways,
      pitch: sensitivityPitch * up_down,
    };
  };

  return {
    onMount: mountEvents,
    onUnmount: unmountEvents,
    getRotation: getRotation,
  };
};

export type { MouseInput };
