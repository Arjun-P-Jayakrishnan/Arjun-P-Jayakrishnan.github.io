import { createAnimationUnit } from "engine/managers/animation/AnimationUnit";
import { AnimationFSM } from "engine/managers/animation/FSM";
import { AnimationGraph } from "engine/managers/animation/GraphRuntime";
import { createAnimationParameters } from "engine/managers/animation/Parameters";
import { PlaybackManager } from "engine/managers/animation/PlaybackManager";
import { AnimationClip, Group, Object3DEventMap } from "three";

/**
 * Creates the animation entity for the player.
 *
 * This entity wires together:
 * - Animation parameters (data)
 * - FSM (state logic)
 * - Animation graph (state → clips / blending)
 * - Playback manager (runtime execution)
 *
 * The orchestrator is responsible for updating this entity.
 */
export const createPlayerAnimationEntity = ({
  id,
  animations,
  playerObject,
}: {
  /** Unique entity ID (used by the AnimationOrchestrator) */
  id: string;

  /** Root object that owns the AnimationMixer */
  playerObject: Group<Object3DEventMap>;

  /** Animation clips loaded with the model */
  animations: AnimationClip[];
}) => {
  /**
   * Runtime animation parameters.
   * These are written by gameplay systems and read by FSM / graph logic.
   */
  const params = createAnimationParameters([
    { name: "speed", type: "float", defaultValue: 0 },
    { name: "isMoving", type: "bool", defaultValue: false },
  ]);

  /**
   * Finite State Machine controlling high-level animation state.
   *
   * The FSM itself is logic-only and does not know about clips or playback.
   */
  const fsm = new AnimationFSM("idle", [
    {
      name: "idle",
      transitions: [
        {
          to: "walk",
          condition: (p) => p.get("isMoving") === true,
        },
      ],
    },
    {
      name: "walk",
      transitions: [
        {
          to: "run",
          condition: (p) => p.get("isRunning") === true,
        },
        {
          to: "idle",
          condition: (p) => p.get("isMoving") === false,
        },
      ],
    },
    {
      name: "run",
      transitions: [
        {
          to: "walk",
          condition: (p) => p.get("isRunning") === false,
        },
        {
          to: "idle",
          condition: (p) => p.get("isMoving") === false,
        },
      ],
    },
  ]);

  const getClipByName = (name: string) =>
    animations.find((c) => c.name.toLowerCase() === name.toLowerCase())!;

  /**
   * Animation graph mapping FSM states to animation clips.
   *
   * Optional blend functions allow parameter-driven weighting.
   */
  const graph = new AnimationGraph([
    {
      name: "idle",
      clip: getClipByName("Idle"),
    },
    {
      name: "walk",
      clip: getClipByName("Walk"),
      blend: (params) => Math.min((params.get("speed") as number) / 0.6, 1),
    },
    {
      name: "run",
      clip: getClipByName("Run"),
      blend: (params) =>
        Math.min(((params.get("speed") as number) - 0.6) / 0.4, 1),
    },
  ]);

  /**
   * Animation unit responsible for:
   * - Owning the AnimationMixer
   * - Creating AnimationActions from clips
   * - Crossfading and playback control
   */
  const animationUnit = createAnimationUnit({
    root: playerObject,
    clips: animations,
    crossfadeDuration: 0.2,
  });

  /**
   * Playback manager bridges:
   * FSM + Graph → AnimationUnit execution
   */
  const playback = new PlaybackManager(animationUnit);

  /**
   * Final animation entity registered into the AnimationOrchestrator.
   */
  return {
    id,
    params,
    fsm,
    graph,
    playback,
  };
};
