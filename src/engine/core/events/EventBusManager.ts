import { createEventBus, EventBus } from "./eventBus";
import { DebugEvents, LoadingEvents, NavigationEvents } from "./eventType";

interface EventBusManager {
  /**
   * @description Event Bus for loading related events
   */
  loadingBus: EventBus<LoadingEvents>;
  /**
   * @description Event bus for display related events
   */
  displayBus: EventBus<NavigationEvents>;
  /**
   * @description Event bus for debugging
   */
  debugBus: EventBus<DebugEvents>;
}

/**
 * @description creates anf manages event buses designed for various tasks
 * @returns
 */
const createEventBusManager = (): EventBusManager => {
  const loadingBus = createEventBus<LoadingEvents>();
  const displayBus = createEventBus<NavigationEvents>();
  const debugBus = createEventBus<DebugEvents>();

  return {
    loadingBus: loadingBus,
    displayBus: displayBus,
    debugBus: debugBus,
  };
};

export { createEventBusManager };
export type { EventBusManager };
