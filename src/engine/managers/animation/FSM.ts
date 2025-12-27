import { AnimationParameters } from "./Parameters";

/**
 * Interface for any FSM Runtime.
 */
export interface FSMRuntime {
  /** Current active state name */
  currentState: string;

  /**
   * Evaluate transitions and update the current state.
   * @param params - The animation parameters used to check transition conditions.
   */
  tick(params: AnimationParameters): void;

  /** Get the previous state, if any */
  getPreviousState(): string | undefined;

  /**
   * Check if FSM is currently in a specific state
   * @param name - State name to check
   */
  isInState(name: string): boolean;
}

/** Condition function used to evaluate a transition */
export type TransitionCondition = (params: AnimationParameters) => boolean;

/** Represents a transition from one state to another */
export interface Transition {
  /** Target state name */
  to: string;

  /** Condition function to trigger this transition */
  condition: TransitionCondition;
}

/** Represents a single FSM state */
export interface FSMState {
  /** Unique state name */
  name: string;

  /** Optional transitions from this state */
  transitions?: Transition[];

  /** Optional hook called when entering this state */
  onEnter?: () => void;

  /** Optional hook called when exiting this state */
  onExit?: () => void;
}

/**
 * Animation FSM implementation of FSMRuntime.
 * Handles current state, transitions, and entry/exit hooks.
 */
export class AnimationFSM implements FSMRuntime {
  /** Map of state name to FSMState */
  private states: Map<string, FSMState>;

  /** Previously active state name */
  private previousState?: string;

  /** Currently active state name */
  public currentState: string;

  /**
   * Create a new AnimationFSM instance.
   * @param initialState - Name of the initial state
   * @param stateDefs - Array of FSM states
   */
  constructor(initialState: string, stateDefs: FSMState[]) {
    this.states = new Map(stateDefs.map((s) => [s.name, s]));
    this.currentState = initialState;
  }

  /**
   * Evaluate transitions based on animation parameters.
   * Updates the current state if a transition condition is met.
   * @param params - Animation parameters used to evaluate transitions
   */
  tick(params: AnimationParameters) {
    const state = this.states.get(this.currentState);
    console.log("[tick:AnimationFSM] state", state);
    if (!state?.transitions) return;

    for (const t of state.transitions) {
      console.log("[tick:AniamtionFSM] t", t.condition(params));
      if (t.condition(params)) {
        this.changeState(t.to);
        break; // only first valid transition per tick
      }
    }
  }

  /**
   * Change the current state and call exit/enter hooks.
   * @param next - Name of the next state
   */
  private changeState(next: string) {
    if (this.currentState === next) return;

    const current = this.states.get(this.currentState);
    current?.onExit?.();

    this.previousState = this.currentState;
    this.currentState = next;

    const nextState = this.states.get(this.currentState);
    nextState?.onEnter?.();
  }

  /**
   * Get the previously active state.
   * @returns Name of the previous state or undefined
   */
  getPreviousState(): string | undefined {
    return this.previousState;
  }

  /**
   * Check if the FSM is currently in a specific state.
   * @param name - State name to check
   * @returns True if the FSM is in the specified state
   */
  isInState(name: string): boolean {
    return this.currentState === name;
  }
}
