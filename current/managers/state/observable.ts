/**
 * Properties of observable
 */
export interface ObservableProps<T> {
  initial: T;
}

/**
 * Observable methods
 */
export interface Observable<T> {
  /**
   *
   * @description gets current state
   * @returns currents state
   */
  getValue: () => T;
  /**
   * @description changes the current state to new state and notifies all listeners
   * @param value the new state
   */
  setValue: (value: T) => void;
  /**
   * @description allows to look for changes
   * @param fn callback function to be run when state changes
   * @returns un subscribe function reference to unsubscribe when no longer needed
   */
  subscribeToChanges: (fn: (val: T) => void) => () => void;
  /**
   * @description allows clean up of unsubscribed functions
   */
  dispose: () => void;
}

/**
 * @description creates an observable for the given type with a initial state
 * @param props initial state of observable
 * @returns observable
 */
export const createObservable = <T>(
  props: ObservableProps<T>
): Observable<T> => {
  let value = props.initial;
  const listeners: Set<(val: T) => void> = new Set();
  let scheduled: boolean = false;

  /**
   * @description changes the state to new state and notifies all listeners
   * @param _value the new state
   */
  const setValue = (_value: T) => {
    if (value === _value) {
      return;
    }
    value = _value;
    if (!scheduled) {
      setTimeout(() => {
        listeners.forEach((fn) => fn(_value));
      }, 0);
    }
  };

  /**
   * @description gets the data of current state
   * @returns the current state
   */
  const _getValue = () => {
    return value;
  };

  /**
   * @description subscribe to state changes
   * @param fn the callback function when the state changes
   * @returns un subscribe function to clean up
   */
  const subscribeToChanges = (fn: (val: T) => void) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  };

  /**
   * @description clears the set so that there are no memory leaks
   */
  const dispose = () => {
    listeners.clear();
  };

  return Object.freeze({
    getValue: _getValue,
    setValue: setValue,
    subscribeToChanges: subscribeToChanges,
    dispose: dispose,
  });
};
