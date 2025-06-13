import { AnimationAction, AnimationMixer } from "three";
import { Nullable } from "../utils/types/lifecycle";

export interface AnimationControllerProps {
  mixer: AnimationMixer;
  actions: Record<string, AnimationAction>;
  crossFadeDuration: 0.3;
}

export interface AnimationController {
  play: (animationName: string, blendDuration?: number) => void;
  stop: () => void;
  getCurrentAnimation: () => string | null;
  update: (deltaTime: number) => void;
}

export const createAnimationController = ({
  mixer,
  actions,
  crossFadeDuration = 0.3,
}: AnimationControllerProps): AnimationController => {
  let currentAnimation: Nullable<string> = null;
  let blendTime: number = 0;
  let currentAction: Nullable<AnimationAction> = null;

  const play = (animationName: string, blendDuration = 0) => {
    if (currentAnimation === animationName) return;

    const nextAction = actions[animationName];
    if (!nextAction) return;
    nextAction.reset();
    nextAction.play();

    if (currentAction != null) {
      (currentAction as AnimationAction).crossFadeTo(
        nextAction,
        crossFadeDuration,
        false
      );
    }

    currentAction = nextAction;
    currentAnimation = animationName;
  };

  const stop = () => {};

  const getCurrentAnimation = () => {
    return currentAnimation;
  };

  const update = (deltaTime: number) => {
    if (deltaTime !== undefined) mixer.update(deltaTime);
  };

  return {
    play: play,
    getCurrentAnimation: getCurrentAnimation,
    stop: stop,
    update: update,
  };
};
