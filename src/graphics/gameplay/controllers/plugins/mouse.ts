import { ControllerPlugin } from "../plugins";


export interface MouseControllerProps {
  sensitivity: number;
}

export interface MouseController extends ControllerPlugin {
  getRotation: () => {
    pitch: number;
    yaw: number;
  };
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

export const createMouseController = (
  props: MouseControllerProps
): MouseController => {
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
    state.rotation.pitch = e.clientY - state.mouse.lastY;
    state.rotation.yaw = e.clientX - state.mouse.lastX;

    state.mouse.lastX = e.clientX;
    state.mouse.lastY = e.clientY;
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
      yaw: props.sensitivity * sideways,
      pitch: props.sensitivity * up_down,
    };
  };

  return {
    mount: mountEvents,
    unmount: unmountEvents,
    getRotation: getRotation,
  };
};
