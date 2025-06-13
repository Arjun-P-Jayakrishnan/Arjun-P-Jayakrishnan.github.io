import { createObservable, Observable } from "./observable";

type ObservableMap = Record<string, Observable<any>>;

/**
 * Here we map key to state
 *
 * [key in T i.e string] : U (type extracted from observable)
 *
 * key : U or never
 */
type ExtractState<T extends ObservableMap> = {
  [K in keyof T]: T[K] extends Observable<infer U> ? U : never;
};

export interface GlobalState {
  /**
   *@description populates the state with Initial values
   */
  inflate: () => void;
  /**
   * @description gets the current state
   * @returns the state with fields for the given map
   */
  getState: <T extends ObservableMap>() => ExtractState<T>;
  /**
   * @description updates to the new state
   * @param newState only the part of the state say eg loading state
   */
  setState: <T extends ObservableMap>(newState: Partial<ExtractState<T>>) => void;
  /**
   * @description gets the observable
   * @param key string
   * @returns observable
   */
  getObservable: <K extends keyof ObservableMap>(
    key: K
  ) => Observable<ObservableMap[K]>;
  /**
   *
   * @param key the state to which subscription is taken
   * @param fn the callback function
   * @returns un subscribe function
   */
  subscribe: <K extends keyof ObservableMap>(
    key: K,
    fn: (value: ObservableMap[K]) => void
  ) => () => void;
  /**
   * @description clears up any left over observables
   */
  dispose: () => void;
}

export const createGlobalState = <T extends ObservableMap>(
  map: Record<string, any>
): GlobalState => {
  const stateMap: T = {} as T;
  /**
   *@description inflates the state-map with values
   */
  const inflate = () => {
    //createObservable({initial:map[key]})

    for (const key in map) {
      const observable = createObservable({ initial: map[key] });
      stateMap[key as keyof T] = observable as T[typeof key];
    }
  };

  /**
   * @description gets the state from observables
   * @returns current state
   */
  const getState = <T extends ObservableMap>(): ExtractState<T> => {
    const state = {} as ExtractState<T>;

    for (const key in stateMap) {
      state[key] = stateMap[key].getValue();
    }

    return state;
  };

  /**
   * @description sets the new state
   * @param newState the state which has to be updated
   */
  const setState = <T extends ObservableMap>(newState: Partial<ExtractState<T>>) => {
    for (const key in newState) {
      if (stateMap[key]) {
        stateMap[key].setValue(newState[key]);
      }
    }
  };

  /**
   * @description gets the observable
   * @param key string
   * @returns observable for the key
   */
  const getObservable = <K extends keyof ObservableMap>(
    key: K
  ): Observable<ObservableMap[K]> => {
    return stateMap[key];
  };

  /***
   * @description subscribe to underlying observable
   */
  const subscribe = <K extends keyof ObservableMap>(
    key: K,
    fn: (value: T[K]) => void
  ) => {
    return stateMap[key].subscribeToChanges(fn);
  };

  /**
   * dispose off any unwanted observables if any is left behind
   */
  const dispose = () => {
    for (const key in stateMap) {
      stateMap[key].dispose();
    }
  };

  return Object.freeze({
    inflate: inflate,
    getState: getState,
    setState: setState,
    getObservable: getObservable,
    subscribe: subscribe,
    dispose: dispose,
  });
};
