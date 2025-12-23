type ListenerCleanup = () => void;
const cleanups: ListenerCleanup[] = [];

/**
 * Add a listener and track for cleanup
 * @param target Event target
 * @param event Event name
 * @param handler Handler function
 * @param options Event listener options
 */
export const addListener = <T extends EventTarget>(
  target: T,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) => {
  target.addEventListener(event, handler, options);
  cleanups.push(() => target.removeEventListener(event, handler, options));
};

/**
 * Remove all tracked listeners
 */
export const removeAllListeners = () => {
  cleanups.forEach((fn) => fn());
  cleanups.length = 0;
};
