const MAX_TASKS_PER_FRAME = 5;
const MAX_FRAME_BUCKET_TIME = 20; //ms

const DEFAULT_CAMERA_OPTIONS = {
  fov: 75,
  aspectRatio: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 1000,
} as const;

const CANVAS_ID = "game-engine";

const MOUSE_CONFIG = {
  SENSITIVITY: { sensitivityYaw: 0.001, sensitivityPitch: 0.001 },
};

export {
  CANVAS_ID,
  DEFAULT_CAMERA_OPTIONS,
  MAX_FRAME_BUCKET_TIME,
  MAX_TASKS_PER_FRAME,
  MOUSE_CONFIG,
};
