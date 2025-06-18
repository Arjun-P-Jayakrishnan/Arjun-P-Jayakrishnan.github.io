import { AnimationUnit } from "engine/managers/animation/AnimationUnit";
import { InputManager } from "engine/managers/InputManager";
import { PlayerStateId } from "types/fsm.types";
import { GenericFSM } from "types/plugin.types";
import { Idle, PlayerFSMState, Run, Walk } from "./states";

/** Maineted internally by fsm controller */
interface PlayerFSM extends GenericFSM<PlayerStateId> {
  /** helper to check if moving or stationary*/
  isMoving: () => boolean;

  /** helper to check if need to run or be in current state if not running */
  isShiftPressed: () => boolean;
}

interface FSMOptions {
  inputs: InputManager;
  animationUnit: AnimationUnit<PlayerStateId>;
}

/**Controls the animations */
interface FSMController {
  mount: () => void;
  update: (deltaTime: number) => void;
  unmount: () => void;
}

const createPlayerFSMController = ({
  inputs,
  animationUnit,
}: FSMOptions): FSMController => {
  const { mouse, keyboard } = {
    mouse: inputs.getController("mouse"),
    keyboard: inputs.getController("keyboard"),
  };

  let shiftPressed: boolean;
  const states: Record<PlayerStateId, PlayerFSMState> = {
    Idle: Idle({
      animationUnit: animationUnit,
      stateId: "Idle",
    }),
    Walk: Walk({
      animationUnit: animationUnit,
      stateId: "Walk",
    }),
    Run: Run({
      animationUnit: animationUnit,
      stateId: "Run",
    }),
  };

  let state: PlayerFSMState = states.Idle;
  let currentState: PlayerStateId = "Idle";

  const update = (deltaTime: number) => {
    state.execute(playerFSM);
    animationUnit.update(deltaTime);
  };

  const isMoving = () => {
    if (
      keyboard?.isKeyPressed("w") ||
      keyboard?.isKeyPressed("a") ||
      keyboard?.isKeyPressed("s") ||
      keyboard?.isKeyPressed("d")
    ) {
      return true;
    }

    return false;
  };

  const isShiftPressed = () => {
    return keyboard?.isKeyPressed("shift") ?? false;
  };

  const _getState = (stateId: PlayerStateId) => {
    return states[stateId];
  };

  const changeState = (newState: PlayerStateId) => {
    if (currentState !== newState) {
      currentState = newState;
      state.exit(playerFSM);
      state = _getState(newState);
      state.enter(playerFSM);
    }
  };

  const mount = () => {
    state.enter(playerFSM);
  };

  const playerFSM: PlayerFSM = {
    changeState: changeState,
    isMoving: isMoving,
    isShiftPressed: isShiftPressed,
  };

  const unmount = () => {};

  return {
    mount: mount,
    update: update,
    unmount: unmount,
  };
};

export { createPlayerFSMController };
export type { FSMController, FSMOptions, PlayerFSM };
