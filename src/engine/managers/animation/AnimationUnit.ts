import { AnimationAction, AnimationMixer } from "three";
import { Nullable } from "types/generic.types";

interface AnimationUnit<T extends string> {
  /**Initialize animation mixer for the model */
  onMount: (mixer: AnimationMixer) => void;

  /** if the fsm state chnage s to a new state it will enable crossfade to the new animation*/
  play: (animationName: T, blendDuration?: number) => void;

  /**stops all related animation*/
  stop: () => void;

  /**gets current animation */
  getCurrentAnimation: () => string | null;

  /** update animation mixers to show animations */
  update: (deltaTime: number) => void;

  /**clean up for unmount */
  onUnmount: () => void;
}

type AnimationFSM = {};

const createAnimationUnit = <T extends string>({
  crossfadeDuration,
  actions,
}: {
  crossfadeDuration: number;
  actions: Record<T, AnimationAction>;
}): AnimationUnit<T> => {
  let mixer: AnimationMixer;
  let currentAnimation: Nullable<string> = null;
  let blendTime: number = 0;
  let currentAction: Nullable<AnimationAction> = null;

  const onMount = (_mixer: AnimationMixer) => {
    mixer = _mixer;
  };

  const play = (animationName: T, blendDuration = 0) => {
    if (currentAnimation === animationName) return;

    const nextAction = actions[animationName];
    if (!nextAction) return;
    nextAction.reset();
    nextAction.play();

    if (currentAction != null) {
      (currentAction as AnimationAction).crossFadeTo(
        nextAction,
        crossfadeDuration,
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

  const onUnmount = () => {};

  return {
    onMount,
    getCurrentAnimation,
    play,
    stop,
    update,
    onUnmount,
  };
};

export { createAnimationUnit };

export type { AnimationUnit };
