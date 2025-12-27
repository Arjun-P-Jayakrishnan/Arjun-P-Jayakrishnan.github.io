import { AnimationMixer } from "three";
import { AnimationUnit } from "./AnimationUnit";
import { AnimationFSM } from "./FSM";
import { AnimationGraphRuntime } from "./GraphRuntime";
import { AnimationParameters } from "./Parameters";

/** Represents a single playing animation (optional, can expose state) */
export interface PlayingAnimation {
  name: string | null;
  weight: number;
}

/**
 * PlaybackManager: wraps a Three.js AnimationUnit
 */
export class PlaybackManager<T extends string = string> {
  private animationUnit: AnimationUnit<T>;

  constructor(animationUnit: AnimationUnit<T>) {
    this.animationUnit = animationUnit;
  }

  /** Tick/update the animation unit */
  tick(
    deltaTime: number,
    graph: AnimationGraphRuntime,
    params: AnimationParameters,
    fsm: AnimationFSM
  ) {
    // 1. Update graph with FSM state
    graph.tick(fsm, params);

    // 2. Get active clip
    const activeClips = graph.getCurrentAnimations();
    if (activeClips.length > 0) {
      const clip = activeClips[0].clip;
      this.animationUnit.play(clip.name as any);
    }

    // 3. Advance the mixer
    this.animationUnit.update(deltaTime);
  }

  /** Play a specific animation by name */
  play(animationName: T, blendDuration?: number) {
    this.animationUnit.play(animationName, blendDuration);
  }

  /** Stop current animation */
  stop() {
    this.animationUnit.stop();
  }

  /** Get current animation name */
  getCurrentAnimation(): string | null {
    return this.animationUnit.getCurrentAnimation();
  }

  /** Set playback speed */
  setSpeed(speed: number) {
    this.animationUnit.setSpeed(speed);
  }

  /** Set playback direction */
  setDirection(direction: 1 | -1) {
    this.animationUnit.setDirection(direction);
  }

  /** Mount the AnimationUnit with a Three.js mixer */
  onMount(mixer?: AnimationMixer) {
    this.animationUnit.onMount(mixer);
  }

  /** Cleanup */
  onUnmount() {
    this.animationUnit.onUnmount();
  }

  /** Expose simplified "playing animation" for orchestrator */
  getPlayingAnimations(): PlayingAnimation[] {
    return [
      {
        name: this.getCurrentAnimation(),
        weight: 1, // optional, can extend with blending info
      },
    ];
  }
}
