import { AnimationUnit } from "engine/managers/animation/AnimationUnit";
import { FSMController } from "plugins/fsm/player/controller";
import { Nullable } from "./generic.types";

type PlayerStateId = "Idle" | "Walk" | "Run";

type AnimationMap = {
  Player: Nullable<AnimationReference<PlayerStateId>>;
};

type AnimationReference<T extends string> = {
  animationUnit: AnimationUnit<T>;
  fsm: FSMController;
};

export type { AnimationMap, AnimationReference, PlayerStateId };
