//A callback that handles specific event object of type T.
export type Listener<T> = (event: T) => void;

export interface EventBus<T extends { type: string }> {
  /**
   * @description subscribe to event
   * @param type the event type
   * @param callback the listener callback when event is triggered
   */
  on: <K extends T["type"]>(
    type: K,
    callback: Listener<Extract<T, { type: K }>>
  ) => void;

  /**
   * @description un-subscribe to event
   * @param type event type to be un subscribe
   * @param callback call back that has to be removed
   */
  off: <K extends T["type"]>(
    type: K,
    callback: Listener<Extract<T, { type: K }>>
  ) => void;

  /**
   * @description emits the event
   * @param event event that must be emitted
   */
  emit: (event: T) => void;

  /**
   * @description clears all the listeners
   */
  clear: () => void;

  once: <K extends T["type"]>(
    type: K,
    callback: Listener<Extract<T, { type: K }>>
  ) => void;
}

/**
 * @description creates an event Bus for a custom event type
 *
 * Note: event must be an object with a parameter {type:string,.....}
 * @returns
 */
export const createEventBus = <T extends { type: string }>(): EventBus<T> => {
  /**
   *  "start" -- its callbacks
   */
  const listeners = new Map<T["type"], Set<Listener<T>>>();

  /**
   * @description register a listener for a specfic event type
   * @param type event type
   * @param callback extracts only the ones with the event type
   */
  const _on = <K extends T["type"]>(
    type: K,
    callback: Listener<Extract<T, { type: K }>>
  ) => {
    if (!listeners.has(type)) {
      listeners.set(type, new Set());
    }

    listeners.get(type)!.add(callback as Listener<T>);
  };

  /**
   * @description un subscribe from the event
   * @param type the event type
   * @param callback the callback that has to be removed
   */
  const _off = <K extends T["type"]>(
    type: K,
    callback: Listener<Extract<T, { type: K }>>
  ) => {
    listeners.get(type)?.delete(callback as Listener<T>);
  };

  /**
   * @description similar in function to notify all
   * @param event event that has to be triggered
   */
  const _emit = (event: T) => {
    listeners.get(event.type)?.forEach((callback) => {
      callback(event);
    });
  };

  /**
   * @description clean up function
   */
  const _clear = () => {
    listeners.clear();
  };

  /**
   * @description calls the function once
   * @param type event type
   * @param callback callback to be executed
   */
  const _once = <K extends T["type"]>(
    type: K,
    callback: Listener<Extract<T, { type: K }>>
  ) => {
    const wrapper = (event: Extract<T, { type: K }>) => {
      callback(event);
      _off(type, wrapper);
    };

    _on(type, wrapper);
  };

  return Object.freeze({
    on: _on,
    off: _off,
    emit: _emit,
    clear: _clear,
    once: _once,
  });
};
