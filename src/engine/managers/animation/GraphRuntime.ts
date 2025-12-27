import { FSMRuntime } from "./FSM";
import { AnimationParameters } from "./Parameters";

/**
 * Represents a single animation clip.
 */
export interface AnimationClip {
  /** Clip name */
  name: string;

  /** Duration of the clip in seconds */
  duration: number;

  /** Whether the clip should loop */
  loop?: boolean;
}

/**
 * A node in the animation graph, corresponding to a FSM state or blend.
 */
export interface AnimationGraphNode {
  /** Node name, usually matching FSM state */
  name: string;

  /** Animation clip for this node */
  clip?: AnimationClip;

  /**
   * Optional blend function returning a weight (0..1)
   * Can use animation parameters to compute weight dynamically
   */
  blend?: (params: AnimationParameters) => number;
}

/**
 * Interface for an animation graph runtime.
 */
export interface AnimationGraphRuntime {
  /**
   * Evaluate the graph for the current FSM state and parameters.
   * @param fsm - The FSM runtime providing the current state
   * @param params - The animation parameters used for blending
   */
  tick(fsm: FSMRuntime, params: AnimationParameters): void;

  /**
   * Get the currently active animation clips and their weights.
   * @returns Array of active clips and weights
   */
  getCurrentAnimations(): { clip: AnimationClip; weight: number }[];
}

/**
 * Simple animation graph runtime that maps FSM states to animation clips.
 */
export class AnimationGraph implements AnimationGraphRuntime {
  private nodes: Map<string, AnimationGraphNode>;
  private active: { clip: AnimationClip; weight: number }[] = [];

  /**
   * Create a new AnimationGraph.
   * @param nodes - Array of animation graph nodes
   */
  constructor(nodes: AnimationGraphNode[]) {
    this.nodes = new Map(nodes.map((n) => [n.name, n]));
  }

  /**
   * Tick the graph: update active animation based on FSM state and parameters.
   * @param fsm - FSM runtime to read the current state
   * @param params - Animation parameters for blending
   */
  tick(fsm: FSMRuntime, params: AnimationParameters) {
    const node = this.nodes.get(fsm.currentState);
    if (!node) {
      this.active = [];
      return;
    }

    this.active = [];

    if (node.clip) {
      // Single clip node
      this.active.push({ clip: node.clip, weight: 1 });
    } else if (node.blend) {
      // Blend node
      const weight = node.blend(params);
      // For now, assume a single clip for blend
      if (node.clip) {
        this.active.push({ clip: node.clip, weight });
      }
    }
  }

  /**
   * Get currently active animations with weights.
   * @returns Array of { clip, weight } objects
   */
  getCurrentAnimations() {
    return [...this.active];
  }
}
