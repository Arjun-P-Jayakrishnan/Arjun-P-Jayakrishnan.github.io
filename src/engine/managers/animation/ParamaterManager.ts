import { AnimationParamDefinition, AnimationParamValue } from "./Parameters";

/**
 * Listener for parameter changes
 */
export type AnimationParamListener = (
  name: string,
  value: AnimationParamValue
) => void;

/**
 * Manager / store for animation parameters with reactive signals
 */
export class AnimationParametersManager {
  private values = new Map<string, AnimationParamValue>();
  private listeners = new Set<AnimationParamListener>();

  constructor(definitions: readonly AnimationParamDefinition[]) {
    // Initialize defaults
    for (const def of definitions) {
      this.values.set(def.name, def.defaultValue);
    }
  }

  /** Get a parameter value */
  get(name: string): AnimationParamValue {
    return this.values.get(name)!;
  }

  /** Set a parameter value and notify listeners */
  set(name: string, value: AnimationParamValue) {
    this.values.set(name, value);
    this.listeners.forEach((l) => l(name, value));
  }

  /**
   * Subscribe to parameter changes.
   * Returns an unsubscribe function.
   */
  onChange(listener: AnimationParamListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
