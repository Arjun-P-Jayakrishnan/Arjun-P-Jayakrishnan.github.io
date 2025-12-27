/**
 * Allowed runtime values for animation parameters.
 */
export type AnimationParamValue = number | boolean;

/**
 * Supported animation parameter kinds.
 */
export type AnimationParamType = "float" | "bool";

/**
 * Definition of a single animation parameter.
 */
export interface AnimationParamDefinition {
  /** Unique parameter name */
  name: string;

  /** Parameter type */
  type: AnimationParamType;

  /** Initial value */
  defaultValue: AnimationParamValue;
}

/**
 * Runtime access interface for animation parameters.
 */
export interface AnimationParameters {
  /**
   * Set a parameter value.
   */
  set(name: string, value: AnimationParamValue): void;

  /**
   * Get a parameter value.
   */
  get(name: string): AnimationParamValue;
}

/**
 * Creates a parameter store initialized with default values.
 *
 * @example
 * const params = createAnimationParameters([
 *   { name: "speed", type: "float", defaultValue: 1.0 },
 *   { name: "isRunning", type: "bool", defaultValue: false },
 * ]);
 *
 * params.set("speed", 2.5);
 * params.set("isRunning", true);
 *
 * const speed = params.get("speed"); // 2.5
 */
export const createAnimationParameters = (
  definitions: AnimationParamDefinition[]
): AnimationParameters => {
  const values = new Map<string, AnimationParamValue>();

  // Initialize defaults
  for (const def of definitions) {
    values.set(def.name, def.defaultValue);
  }

  return {
    set(name, value) {
      values.set(name, value);
    },

    get(name) {
      return values.get(name)!;
    },
  };
};
