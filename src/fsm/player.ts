import {
  AnimationController,
  AnimationControllerProps,
} from "controllers/animation";
import { getControllers } from "graphics/mechanics/controllers/controller";

type States = "Idle" | "Walk" | "Run";

interface PlayerFSM {
  changeState: (state: States) => void;
  isMoving: () => boolean;
  isShiftPressed: () => boolean;
}

interface StateProps {
  animationId: string;
  animationController: AnimationController;
}

interface State {
  enter: (player: PlayerFSM) => void;
  execute: (player: PlayerFSM) => void;
  exit: (player: PlayerFSM) => void;
}

const Idle = (props: StateProps): State => {
  const enter = (player: PlayerFSM) => {
    console.log("enter idle");
    props.animationController.play(props.animationId);
  };

  const execute = (player: PlayerFSM) => {
    if (player.isMoving()) {
      if (player.isShiftPressed()) {
        player.changeState("Run");
      } else {
        player.changeState("Walk");
      }
    }
  };

  const exit = (player: PlayerFSM) => {
    console.log("exit idle");
  };

  return {
    enter: enter,
    execute: execute,
    exit: exit,
  };
};

const Walk = (props: StateProps): State => {
  const enter = (player: PlayerFSM) => {
    console.log("enter walk");
    props.animationController.play(props.animationId);
  };

  const execute = (player: PlayerFSM) => {
    if (!player.isMoving()) {
      player.changeState("Idle");
    } else if (player.isShiftPressed()) {
      player.changeState("Run");
    }
  };

  const exit = (player: PlayerFSM) => {
    console.log("exit walk");
  };

  return {
    enter: enter,
    execute: execute,
    exit: exit,
  };
};

const Run = (props: StateProps): State => {
  const enter = (player: PlayerFSM) => {
    console.log("enter run");
    props.animationController.play(props.animationId);
  };

  const execute = (player: PlayerFSM) => {
    if (!player.isMoving()) {
      player.changeState("Idle");
    } else if (!player.isShiftPressed()) {
      player.changeState("Walk");
    }
  };

  const exit = (player: PlayerFSM) => {
    console.log("exit run");
  };

  return {
    enter: enter,
    execute: execute,
    exit: exit,
  };
};

export interface FSMOptions {
  animationController: AnimationController;
}

export interface FSMController {
  mount: () => void;
  update: (deltaTime: number) => void;
  unmount: () => void;
}

export const createFSMController = ({
  animationController,
}: FSMOptions): FSMController => {
  const controllers = getControllers();
  const { mouse, keyboard } = {
    mouse: controllers.getController("mouse"),
    keyboard: controllers.getController("keyboard"),
  };

  let shiftPressed: boolean;
  const { idle, walk, run } = {
    idle: Idle({
      animationController: animationController,
      animationId: "Idle",
    }),
    walk: Walk({
      animationController: animationController,
      animationId: "Walk",
    }),
    run: Run({
      animationController: animationController,
      animationId: "Run",
    }),
  };
  let state: State = idle;
  let currentState: States = "Idle";

  const update = (deltaTime: number) => {
    state.execute(playerFSM);
    animationController.update(deltaTime);
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

  const _getState = (newState: States) => {
    switch (newState) {
      case "Idle":
        return idle;
      case "Walk":
        return walk;
      case "Run":
        return run;
      default:
        return idle;
    }
  };

  const changeState = (newState: States) => {
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
