import { AnimationUnit } from "engine/managers/animation/AnimationUnit";
import { PlayerStateId } from "types/fsm.types";
import { GenericFSMState } from "types/plugin.types";
import { PlayerFSM } from "./controller";

interface PlayerStateProps {
  /**Reference id for animation */
  stateId: PlayerStateId;
  /** animation unit resposnible for crossfade and such */
  animationUnit: AnimationUnit<PlayerStateId>;
}

interface PlayerFSMState extends GenericFSMState<PlayerFSM> {}

const Idle = ({ stateId, animationUnit }: PlayerStateProps): PlayerFSMState => {
  const enter = <T extends PlayerFSM>(player: T) => {
    console.log("enter idle");
    animationUnit.play(stateId);
  };

  const execute = <T extends PlayerFSM>(player: T) => {
    if (!player.isMoving()) return;

    if (player.isShiftPressed()) player.changeState("Run");
    else player.changeState("Walk");
  };

  const exit = <T extends PlayerFSM>(player: T) => {
    console.log("exit idle");
  };

  return {
    enter: enter,
    execute: execute,
    exit: exit,
  };
};

const Walk = ({ animationUnit, stateId }: PlayerStateProps): PlayerFSMState => {
  const enter = <T extends PlayerFSM>(player: T) => {
    console.log("enter walk");
    animationUnit.play(stateId);
  };

  const execute = <T extends PlayerFSM>(player: T) => {
    if (!player.isMoving()) {
      player.changeState("Idle");
    } else if (player.isShiftPressed()) {
      player.changeState("Run");
    }
  };

  const exit = <T extends PlayerFSM>(player: T) => {
    console.log("exit walk");
  };

  return {
    enter: enter,
    execute: execute,
    exit: exit,
  };
};

const Run = ({ animationUnit, stateId }: PlayerStateProps): PlayerFSMState => {
  const enter = <T extends PlayerFSM>(player: PlayerFSM) => {
    console.log("enter run");
    animationUnit.play(stateId);
  };

  const execute = <T extends PlayerFSM>(player: PlayerFSM) => {
    if (!player.isMoving()) {
      player.changeState("Idle");
    } else if (!player.isShiftPressed()) {
      player.changeState("Walk");
    }
  };

  const exit = <T extends PlayerFSM>(player: PlayerFSM) => {
    console.log("exit run");
  };

  return {
    enter: enter,
    execute: execute,
    exit: exit,
  };
};

export { Idle, Run, Walk };

export type { PlayerFSMState };
