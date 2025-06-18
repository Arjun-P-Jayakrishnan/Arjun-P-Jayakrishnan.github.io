import { LoadOptions } from "./loader.types";

/**
 * Backend Plugin Layer for Managing different types of data storage solutions
 */
interface StorageBackend<T> {
  set: <K extends keyof T>(key: K, payload: T[K]) => void;
  get: <K extends keyof T>(key: K) => T[K] | undefined;
  delete: <K extends keyof T>(key: K) => void;
  clear: () => void;
  keys: () => IterableIterator<keyof T>;
}

/**
 * Loader Plugin for different
 */
interface LoaderPlugin {
  load: (assets: LoadOptions) => Promise<void>;
}

/**
 * Input Controller Plugin for different input types
 */
interface InputPlugin {
  onMount: () => void;
  onUnmount: () => void;
}

interface GenericFSM<StateType> {
  /**Trigger state change */
  changeState: (state: StateType) => void;
}

/** Each Finite State Machine's State is depended on the FSM machine */
interface GenericFSMState<GenericFSM> {
  /** Triggered when entering into this state */
  enter: <T extends GenericFSM>(fsm: T) => void;

  /**Executed when we need to move to next fsm */
  execute: <T extends GenericFSM>(fsm: T) => void;

  /**Triggered when exiting from this state */
  exit: <T extends GenericFSM>(fsm: T) => void;
}

export type {
  GenericFSM,
  GenericFSMState,
  InputPlugin,
  LoaderPlugin,
  StorageBackend,
};
