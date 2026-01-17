import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Object3D,
} from "three";
import { Nullable } from "types/generic.types";

/**
 * Interface for a generic animation unit controlling Three.js animations.
 *
 * @template T - String literal type representing animation names
 */
export interface AnimationUnit<T extends string = string> {
  /**
   * Play a specific animation by name.
   * Crossfades from the current animation if any.
   *
   * @param animationName - Name of the animation to play
   * @param blendDuration - Optional crossfade duration (seconds)
   */
  play(animationName: T, blendDuration?: number): void;

  /** Stop the currently playing animation */
  stop(): void;

  /** Get the currently playing animation name */
  getCurrentAnimation(): T | null;

  /**
   * Update the animation mixer with delta time.
   * Should be called every frame.
   *
   * @param deltaTime - Time elapsed since last update (in seconds)
   */
  update(deltaTime: number): void;

  /**
   * Called when the unit is mounted or initialized.
   * Initializes the AnimationMixer and all actions.
   *
   * @param mixer - Optional externally provided AnimationMixer
   */
  onMount(mixer?: AnimationMixer): void;

  /** Called when the unit is unmounted, cleans up actions and mixer */
  onUnmount(): void;

  /**
   * Set playback speed of the current animation.
   *
   * @param speed - Speed multiplier (1 = normal, 0.5 = half speed, etc.)
   */
  setSpeed(speed: number): void;

  /**
   * Set playback direction of the current animation.
   *
   * @param direction - 1 = forward, -1 = backward
   */
  setDirection(direction: 1 | -1): void;
}

/**
 * Factory function to create a reusable AnimationUnit.
 * Handles mixer, actions, crossfading, speed, and direction.
 *
 * @template T - String literal type representing animation names
 * @param root - Root Object3D to animate
 * @param clips - Array of AnimationClips available for this unit
 * @param crossfadeDuration - Default crossfade duration (seconds)
 * @returns A fully initialized AnimationUnit
 */
export const createAnimationUnit = <T extends string = string>({
  root,
  clips,
  crossfadeDuration,
}: {
  root: Object3D;
  clips: AnimationClip[];
  crossfadeDuration: number;
}): AnimationUnit<T> => {
  /** Three.js animation mixer, initialized on mount */
  let mixer: AnimationMixer | null = null;

  /** Map of animation name -> action */
  const actions = new Map<T, AnimationAction>();

  /** Currently playing animation name */
  let currentAnimation: Nullable<T> = null;

  /** Currently active animation action */
  let currentAction: Nullable<AnimationAction> = null;

  /**
   * Play an animation by name.
   * Crossfades from the current action if present.
   */
  const play = (animationName: T, blendDuration?: number) => {
    if (!mixer) return; // mixer not initialized yet
    if (currentAnimation === animationName) return; // already playing

    const nextAction = actions.get(animationName.toLowerCase() as T);
    if (!nextAction) return;

    nextAction.reset().play();

    if (currentAction) {
      currentAction.crossFadeTo(
        nextAction,
        blendDuration ?? crossfadeDuration,
        false
      );
    }

    currentAction = nextAction;
    currentAnimation = animationName;
  };

  /** Stop the current animation */
  const stop = () => {
    currentAction?.stop();
    currentAction = null;
    currentAnimation = null;
  };

  /**
   * Update mixer on each frame.
   * Should be called in the animation loop.
   */
  const update = (deltaTime: number) => {
    mixer?.update(deltaTime);
  };

  /**
   * Mount the unit.
   * Initializes the AnimationMixer and sets up all actions.
   */
  const onMount = (mountedMixer?: AnimationMixer) => {
    mixer = mountedMixer ?? new AnimationMixer(root);

    // Create actions for each clip
    clips.forEach((clip) => {
      actions.set(clip.name.toLowerCase() as T, mixer!.clipAction(clip));
    });
  };

  /** Unmount the unit and clean up resources */
  const onUnmount = () => {
    stop();
    actions.forEach((action) => action.stop());
    actions.clear();
    mixer = null;
  };

  /**
   * Set playback speed for the current animation.
   */
  const setSpeed = (speed: number) => {
    if (currentAction) currentAction.setEffectiveTimeScale(speed);
  };

  /**
   * Set playback direction for the current animation.
   */
  const setDirection = (direction: 1 | -1) => {
    if (!currentAction) return;
    currentAction.timeScale = Math.abs(currentAction.timeScale) * direction;
  };

  return {
    play,
    stop,
    getCurrentAnimation: () => currentAnimation,
    update,
    onMount,
    onUnmount,
    setSpeed,
    setDirection,
  };
};
