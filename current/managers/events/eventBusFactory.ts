import { createEventBus, EventBus } from "./eventBus";
import { DebugEvents, DisplayEvents, LoadingEvents } from "./eventType";

export interface EventBusManager {
  /**
   * @description Event Bus for loading related events
   */
  loadingBus: EventBus<LoadingEvents>;
  /**
   * @description Event bus for display related events
   */
  displayBus: EventBus<DisplayEvents>;
  /**
   * @description Event bus for debugging
   */
  debugBus: EventBus<DebugEvents>;
}

/**
 * @description creates anf manages event buses designed for various tasks
 * @returns
 */
export const createEventBusManager = (): EventBusManager => {
  const loadingBus = createEventBus<LoadingEvents>();
  const displayBus = createEventBus<DisplayEvents>();
  const debugBus = createEventBus<DebugEvents>();

  return {
    loadingBus: loadingBus,
    displayBus: displayBus,
    debugBus: debugBus,
  };
};
